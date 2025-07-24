# Todo数据模型设计思路

本文档阐述了 `src/renderer/src/types/Todo.ts` 中核心数据结构的设计理念、原则与实现要点，帮助开发者快速理解并二次开发。

## 1. 设计目标

1. **类型安全**：利用 TypeScript 的静态类型系统，在编译期捕获潜在错误，减少运行时异常。
2. **数据一致性**：所有 Todo 相关操作都依赖统一的数据模型，避免字段不一致或重复定义。
3. **可维护性**：代码清晰、职责单一，新增字段或功能时改动集中、影响面小。
4. **可扩展性**：预留扩展点（如枚举、辅助类型、工厂函数），方便未来集成持久化、同步等特性。

## 2. 功能实现

1.定义 Todo 接口（id, text, completed, createdAt, updatedAt）
2.定义 TodoFilter 枚举（ALL, ACTIVE, COMPLETED）
3.定义辅助类型（如 TodoInput, TodoUpdate）
4.添加数据验证函数（isValidTodoInput）
5.添加工厂函数（createTodo）

## 3. 核心类型

### 3.1 `Todo`

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `id` | `string` | 采用 `crypto.randomUUID()` 生成的全局唯一标识，确保列表操作的可靠性。 |
| `text` | `string` | 任务描述，保存用户输入的原始文本，允许富文本扩展。 |
| `completed` | `boolean` | 任务完成状态，粒度为单任务级别。 |
| `createdAt` / `updatedAt` | `Date` | 创建/更新时间，支持排序、统计与审计。 |

> 采用 `Date` 而非字符串，统一由业务层负责序列化与反序列化，避免组件层误用。

### 3.2 `TodoFilter` 枚举

- 枚举值 `ALL` / `ACTIVE` / `COMPLETED` 对应 UI 过滤选项。
- 使用字符串字面量构建路由友好的值（如 `?filter=active`）。
- 扩展额外过滤条件（例如 `OVERDUE`、`STARRED`）时无需修改现有逻辑，只需在枚举和过滤器中按需新增。

### 3.3 `TodoInput` 与 `TodoUpdate`

- `TodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>`：
  - 保留用户可控字段，屏蔽系统生成字段。
  - 保证工厂函数 `createTodo` 的入参简单纯粹。
- `TodoUpdate = Partial<Todo>`：
  - 通过全可选字段适配 PATCH 场景，只更新必要字段。

## 4. 工具函数

### 4.1 `isValidTodoInput`

- 负责运行时校验，弥补类型系统无法检查的业务规则（如 `text` 非空）。
- 采用 **类型谓词** `data is TodoInput`，配合 TypeScript 控制流分析提升代码智能提示。

### 4.2 `createTodo`

- 工厂函数统一生成 `id`、时间戳，封装副作用逻辑，保证 Todo 对象完整性。
- 便于未来注入额外字段（如 `priority`、`tags`）时保持低耦合。

## 5. 错误处理策略

- `createTodo` 若入参非法直接抛出 `Error`，由调用层决定 UI 提示方式。
- 避免在核心库中依赖窗口提示，保持平台无关性。

## 6. 小结

通过对 **核心类型 + 枚举 + 辅助类型 + 工厂/校验函数** 的清晰划分，我们实现了强类型、易扩展且业务无关的 Todo 数据模型，为后续功能演进打下坚实基础。
