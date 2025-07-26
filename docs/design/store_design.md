# Pinia状态管理建构和Todo基本业务逻辑实现设计思路

本文档介绍 `src/renderer/src/stores/taskStore.ts`（即 `useTodoStore`）的设计理念与实现细节，帮助开发者理解状态管理与业务逻辑分层。

## 1. 设计目标

1. **单一数据源 (Single Source of Truth)**：确保所有组件共享同一份 Todo 状态，避免难以追踪的数据流。
2. **状态可预测**：通过纯函数 Getter 与显式 Action，提升调试与测试友好度。
3. **易于维护**：模块化拆分，注释详尽，新增功能时只影响局部代码。
4. **可扩展**：预留插件、持久化及时间旅行调试等能力。

## 2. 业务功能实现

1. 新增任务
2. 删除任务
3. 编辑任务文本（空文本自动删除）
4. 切换单个任务完成状态
5. 统计未完成任务数量
6. 根据状态筛选任务（全部 / 活跃 / 已完成）
7. 批量切换全部任务的完成状态
8. 撤销最近一次增删改操作9.本地加载任务（含日期反序列化）

## 3. State 结构

| 字段      | 类型         | 说明                               |
| --------- | ------------ | ---------------------------------- |
| `todos`   | `Todo[]`     | Todo 列表主数据。                  |
| `filter`  | `TodoFilter` | 当前 UI 展示过滤条件。             |
| `history` | `Todo[][]`   | 历史快照栈，用于撤销（Undo）功能。 |

> 采用数组快照而非增量补丁，换取实现简单；若列表规模增大可引入 [immer](https://immerjs.github.io/immer/) 或 CRDT。

## 4. Getter 设计

| Getter            | 责任                                           |
| ----------------- | ---------------------------------------------- |
| `filteredTodos`   | 根据 `filter` 返回子集，对 UI 完全透明。       |
| `activeTodoCount` | 通过 `reduce` 计算未完成数量，避免组件级循环。 |

Getter 必须保持 **纯函数**，即不修改 State，仅基于输入返回派生数据。

## 5. Action 设计

| Action           | 关键实现                                                | 备注                                       |
| ---------------- | ------------------------------------------------------- | ------------------------------------------ |
| `_saveState`     | 使用 `structuredClone` 制作深拷贝快照，入栈 `history`。 | 私有助手，统一快照逻辑。                   |
| `addTodo`        | 校验文本非空→调用 `createTodo` → `push`。               | 新建任务，入参解耦。                       |
| `removeTodo`     | 过滤列表删除目标。                                      | 确保 `history` 记录删除前状态。            |
| `toggleTodo`     | 切换 `completed` 并更新 `updatedAt`。                   | 不变数据原则，但此处直接修改对象满足性能。 |
| `updateTodoText` | 若空文本则删除；否则替换 & 更新时间。                   | 复用逻辑，避免出现空白任务。               |
| `setFilter`      | 仅修改 `filter`，不记录历史。                           | 视图行为不计入撤销。                       |
| `undo`           | 弹出 `history` 栈顶并覆盖 `todos`。                     | 简易时间旅行。                             |
| `toggleAll`      | 遍历 `todos` 并同步状态。                               | 提供一键完成/恢复。                        |
| `loadTodos`      | 反序列化日期字段后覆盖 `todos`。                        | 兼容文件/网络持久化。                      |

## 6. 撤销 (Undo) 策略

1. **深拷贝**：利用 `structuredClone` 确保 `todos` 与快照之间无引用共享，避免回溯后意外篡改。
2. **排除视图操作**：如 `setFilter` 不进入历史，减少无意义回滚。
3. **扩展性**：未来可按需引入时间戳、Redo、分支历史等高级特性。

## 7. 性能考量

- 对于中大型列表 (<5k 项) `structuredClone` 性能足够；如需优化，可：
  - 采用 **增量 patch**（基于 immer 的 `produceWithPatches`）。
  - 引入 **IndexedDB** 持久化并懒加载。
- Getter 使用缓存特性（由 Pinia 内部实现）避免重复计算。

## 8. 测试建议

1. 单元测试每个 Action 的边界与副作用。
2. 使用 **vitest + jsdom** 模拟组件调用，验证 Getter 变化。
3. 性能测试：大规模数据下 `undo` 延迟是否可接受。

## 9. 未来扩展

- **插件化持久化**：Pinia 自带 `pinia-plugin-persistedstate`，可轻松持久到 `localStorage` / `electron-store`。
- **Socket 同步**：在 Action 内部调用 API，同步更新后端并处理冲突。
- **多 store 合并**：当项目增大时，可拆分为 `taskStore`、`userStore` 等，利用 `pinia` 的模块化特性解耦。

## 10. 小结

`taskStore` 采用 **简洁 State + 纯函数 Getter + 明确副作用 Actionf 方法** 的三段式架构，结合历史快照实现基础时间旅行，为后续功能演化（如持久化、协同编辑）提供了可靠的扩展点。
