# 代码规范 (Code Style Guide)

为了保持项目代码的一致性和可维护性，所有开发者都必须遵守以下代码规范。

## 1. Vue 组件规范

### 1.1. 脚本设置 (Script Setup)

- **强制**使用 `<script setup lang="ts">` 语法糖。

  ```vue
  <script setup lang="ts">
  // 组件逻辑
  </script>

  <style scoped>
  <!-- style块必须使用scoped限定作用域 -->
  </style>
  ```

### 1.2. API 风格 (API Style)

- **强制**使用 Vue 3 的组合式 API (Composition API)。
- 禁止使用选项式 API (Options API)。

## 2. Naive UI 组件使用规范

### 2.1. 组件导入 (Component Import)

- 必须从 `naive-ui` 中按需导入具体组件。

  ```ts
  import { NButton, NInput } from 'naive-ui'
  ```

### 2.2. 模板中使用 (Usage in Template)

- 在 `<template>` 中，必须使用 **PascalCase** (首字母大写驼峰式) 形式调用组件。
- **禁止**使用 **kebab-case** (短横线分隔) 形式。

  ```vue
  <template>
    <!-- 正确 (Correct) -->
    <NButton>Click Me</NButton>

    <!-- 错误 (Incorrect) -->
    <!-- <n-button>Click Me</n-button> -->
  </template>
  ```
