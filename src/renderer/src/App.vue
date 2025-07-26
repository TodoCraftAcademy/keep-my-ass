<template>
  <NFlex id="app" vertical>
    <NLayoutHeader bordered>
      <AppHeader />
    </NLayoutHeader>
    <NLayoutContent style="padding: 20px">
      <!-- Main content area -->
      <div id="main-content">
        <AddTodoForm />
        <!-- Todo list or other main content will be placed here -->
      </div>
    </NLayoutContent>
  </NFlex>
</template>

<script setup lang="ts">
import { NFlex, NLayoutHeader, NLayoutContent } from 'naive-ui'
import AppHeader from './components/AppHeader.vue'
import AddTodoForm from './components/AddTodoForm.vue'
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
  text-align: center;
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
}
</style>
