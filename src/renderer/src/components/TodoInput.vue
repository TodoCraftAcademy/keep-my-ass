<template>
  <NForm class="add-todo-form" @submit.prevent="handleSubmit">
    <NFlex vertical :size="12">
      <NFlex align="flex-start" :wrap="false">
        <NInput
          ref="inputRef"
          v-model:value="todoText"
          type="textarea"
          placeholder="添加新的待办事项...（Ctrl+Enter 或 Shift+Enter 提交）"
          clearable
          :status="inputStatus"
          :autosize="{ minRows: 1, maxRows: 4 }"
          class="todo-input"
          @keydown.enter="handleKeyboardSubmit"
          @input="handleInput"
        />
        <NButton
          type="primary"
          :disabled="!isValidInput"
          class="submit-button"
          @click="handleClick"
        >
          添加
        </NButton>
      </NFlex>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </NFlex>
  </NForm>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { NForm, NFlex, NInput, NButton } from 'naive-ui'
import { useTodoStore } from '../stores/todoStore'

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

const submitTodo = async (): Promise<void> => {
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

const handleSubmit = (event: Event): void => {
  event.preventDefault()
  submitTodo()
}

const handleClick = (): void => {
  submitTodo()
}

const handleKeyboardSubmit = (event: KeyboardEvent): void => {
  // 只有在按下 Ctrl+Enter 或 Shift+Enter 时才提交
  if (event.ctrlKey || event.shiftKey) {
    event.preventDefault()
    submitTodo()
  }
}
</script>

<style scoped>
.add-todo-form {
  width: 100%;
}

.todo-input {
  flex: 1;
  min-width: 0;
}

.submit-button {
  flex-shrink: 0;
  margin-left: 12px;
  align-self: flex-start;
}

.error-message {
  color: #d03050;
  font-size: 12px;
  text-align: left;
}

@media (max-width: 480px) {
  .submit-button {
    margin-left: 8px;
  }
}
</style>
