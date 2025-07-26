<template>
  <NFlex class="app-header" justify="space-between" align="center" wrap>
    <h1>Keep My Ass</h1>
    <div class="time-display">{{ currentTime }}</div>
  </NFlex>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { NFlex } from 'naive-ui'

const currentTime = ref('')

const updateTime = (): void => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

let timerId: number | null = null

onMounted(() => {
  updateTime() // 初始化时间
  timerId = window.setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timerId !== null) {
    clearInterval(timerId)
  }
})
</script>

<style scoped>
.time-display {
  font-size: 14px;
  color: #666;
}

.app-header {
  width: 100%;
  padding: 0 20px;
  gap: 10px;
  padding: 10px 20px 20px;
}

@media (max-width: 367.99px) {
  .app-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 5px 20px 5px;
  }
}

h1 {
  font-size: 25px;
  margin: 0px;
}
</style>
