<template>
  <div id="app">
    <HelloWorld msg="Hello World from Vue + Electron!" />
    <NButton type="primary" @click="onSuccClick">S U C C</NButton>
  </div>
</template>

<script lang="ts" setup>
import HelloWorld from './components/HelloWorld.vue'
import { NButton } from 'naive-ui'

const onSuccClick = (): void => {
  alert('succ')
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
