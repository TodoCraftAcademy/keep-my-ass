<template>
  <NForm class="add-todo-form" @submit.prevent="handleSubmit">
    <NFlex align="center" :wrap="false">
      <NInput
        ref="inputRef"
        v-model:value="todoText"
        type="text"
        placeholder="添加新的待办事项..."
        clearable
        :status="inputStatus"
        class="todo-input"
        @keydown.enter="handleSubmit"
        @keydown.esc="handleClear"
        @input="handleInput"
      />
      <NButton type="primary" :disabled="!isValidInput" class="submit-button" @click="handleSubmit">
        添加
      </NButton>
    </NFlex>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </NForm>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { NForm, NFlex, NInput, NButton } from 'naive-ui'
import { useTodoStore } from '../stores/taskStore'

const todoStore = useTodoStore()

const todoText = ref('')
const errorMessage = ref('')
const inputRef = ref<InstanceType<typeof NInput> | null>(null)

const isValidInput = computed(() => {
  return todoText.value.trim().length > 0
})

const inputStatus = computed(() => {
  if (errorMessage.value) return 'error'
  return undefined
})

const handleInput = (): void => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}

const handleSubmit = async (): Promise<void> => {
  const text = todoText.value.trim()

  if (!text) {
    errorMessage.value = '请输入待办事项内容'
    await nextTick()
    inputRef.value?.focus()
    return
  }

  try {
    todoStore.addTodo(text)
    todoText.value = ''
    errorMessage.value = ''

    await nextTick()
    inputRef.value?.focus()
  } catch {
    errorMessage.value = '添加失败，请重试'
  }
}

const handleClear = (): void => {
  todoText.value = ''
  errorMessage.value = ''
}
</script>

<style scoped>
.add-todo-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.todo-input {
  flex: 1;
  min-width: 0;
}

.submit-button {
  flex-shrink: 0;
  margin-left: 12px;
}

.error-message {
  color: #d03050;
  font-size: 12px;
  margin-top: 8px;
  text-align: left;
}

@media (max-width: 480px) {
  .submit-button {
    margin-left: 8px;
  }
}
</style>
