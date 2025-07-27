<template>
  <NFlex id="app" vertical>
    <NLayoutHeader bordered>
      <AppHeader />
    </NLayoutHeader>
    <NLayoutContent>
      <!-- Main content area -->
      <NScrollbar>
        <div id="main-content">
          <!-- Todo list or other main content will be placed here -->
          <TodoItem
            v-for="item in taskStore.filteredTodos"
            :key="item.id"
            :item="item"
            @delete="handleDelete"
          />
          <AddTodoForm id="add-todo-form" />
        </div>
      </NScrollbar>
    </NLayoutContent>
  </NFlex>
</template>

<script setup lang="ts">
import { NFlex, NLayoutHeader, NLayoutContent, NScrollbar } from 'naive-ui'
import TodoItem from './components/TodoItem.vue'
import AppHeader from './components/AppHeader.vue'
import AddTodoForm from './components/TodoInput.vue'
import { useTodoStore } from './stores/todoStore'

const taskStore = useTodoStore()

function handleDelete(id: string): void {
  taskStore.removeTodo(id)
}
</script>

<style>
/* Reset and base styles */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh; /* Full viewport height */
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* Layout specific styles */
.n-layout-header {
  display: flex;
  align-items: center;
  padding: 0 20px;
}

#main-content {
  height: 100%;
  padding: 20px;
}

#add-todo-form {
  margin-top: 20px;
  width: 100%;
}
</style>
