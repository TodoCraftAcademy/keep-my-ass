# Keep My Ass

一个简洁高效的桌面 Todo List 应用，基于 Electron + Vue 3 + TypeScript 构建。

## ✨ 特性

- 🚀 现代化技术栈：Electron + Vue 3 + TypeScript
- 🎨 精美 UI：集成 Naive UI 组件库
- 📦 状态管理：使用 Pinia 进行状态管理
- 🔧 开发体验：完整的 ESLint + Prettier 配置
- 🌍 跨平台：支持 Windows、macOS、Linux

## 🛠️ 技术栈

- **框架**: Electron + Vue 3 + TypeScript
- **构建工具**: Vite + electron-vite
- **UI 组件**: Naive UI
- **状态管理**: Pinia
- **代码规范**: ESLint + Prettier + Husky

## 📦 安装与运行

### 环境要求

- Node.js >= 16
- pnpm >= 7

### 快速开始

```bash
# 克隆项目
git clone <repository-url>
cd keep-my-ass

# 安装依赖
pnpm i

# 安装Pre-commit Hook
pnpm prepare

# 启动开发环境
pnpm dev
```

### 构建发布

```bash
# Windows
pnpm build:win

# macOS
pnpm build:mac

# Linux
pnpm build:linux
```

## 🧰 开发命令

```bash
# 开发环境
pnpm dev

# 代码格式化
pnpm format

# 代码检查
pnpm lint

# 类型检查
pnpm typecheck

# 预览构建结果
pnpm start
```

## 📁 项目结构

```
keep-my-ass/
├── src/
│   ├── main/           # Electron 主进程
│   ├── preload/        # 预加载脚本
│   └── renderer/       # Vue 渲染进程
│       └── src/
│           ├── components/  # Vue 组件
│           └── stores/      # Pinia 状态管理
├── doc/                # 项目文档
├── build/              # 构建配置
└── resources/          # 应用资源
```

## 📖 开发文档

详细的开发文档请查看：[开发者文档](./doc/开发者文档.md)

## 🎯 MVP 计划

第一周 MVP 功能规划：

- ✅ 项目架构搭建
- ⏳ 基础任务 CRUD 操作
- ⏳ 任务状态管理
- ⏳ 数据持久化
- ⏳ 简洁的用户界面

详细规划请查看：[第一周 MVP](./doc/会议/第一周/第一周MVP.md)

## 🔧 推荐 IDE 配置(VSCode)

- ESLint
- Prettier
- Vue
- Pretty Typescript Errors
- Better Comments
- Dependi
- Tabout
- Todo+

## 🌿 分支规范

- **主分支**: `main`
- **开发分支**: `dev`
- **功能开发**: `feat/xxx`
- **问题修复**: `fix/xxx`
- **文档更新**: `docs/xxx`

## 📄 许可证

[MIT License](LICENSE)
