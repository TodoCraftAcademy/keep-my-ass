<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

const props = defineProps<{
  item: TodoItem
}>()

const emit = defineEmits<{
  update: [item: TodoItem]
  delete: [id: number]
}>()

const isEditing = ref(false)
const editText = ref(props.item.text)

// 切换完成状态
const toggleCompleted = (): void => {
  emit('update', {
    ...props.item,
    completed: !props.item.completed
  })
}

// 开始编辑
const startEdit = (): void => {
  isEditing.value = true
  editText.value = props.item.text
}

// 完成编辑
const finishEdit = (): void => {
  if (editText.value.trim()) {
    emit('update', {
      ...props.item,
      text: editText.value.trim()
    })
  }
  isEditing.value = false
}

// 取消编辑
const cancelEdit = (): void => {
  editText.value = props.item.text
  isEditing.value = false
}

// 删除项目
const deleteItem = (): void => {
  emit('delete', props.item.id)
}

// 处理键盘事件
const handleKeyup = (event: KeyboardEvent): void => {
  if (event.key === 'Enter') {
    finishEdit()
  } else if (event.key === 'Escape') {
    cancelEdit()
  }
}
</script>

<template>
  <div class="todo-item" :class="{ completed: item.completed }">
    <!-- 复选框 -->
    <input type="checkbox" class="checkbox" :checked="item.completed" @change="toggleCompleted" />

    <!-- 文本显示/编辑 -->
    <div v-if="!isEditing" class="content" @dblclick="startEdit">
      <span class="text" :class="{ 'line-through': item.completed }">
        {{ item.text }}
      </span>
    </div>

    <!-- 编辑输入框 -->
    <div v-else class="content">
      <input
        ref="editInput"
        v-model="editText"
        class="edit-input"
        autofocus
        @blur="finishEdit"
        @keyup="handleKeyup"
      />
    </div>

    <!-- 删除按钮 -->
    <button class="delete-btn" title="删除" @click="deleteItem">✕</button>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 8px;
  background: white;
  transition: all 0.2s ease;
}

.todo-item:hover {
  border-color: #d1d5db;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-item.completed {
  background-color: #f9fafb;
  opacity: 0.8;
}

.checkbox {
  width: 18px;
  height: 18px;
  margin-right: 12px;
  cursor: pointer;
  accent-color: #3b82f6;
}

.content {
  flex: 1;
  min-height: 24px;
  display: flex;
  align-items: center;
}

.text {
  font-size: 16px;
  color: #374151;
  cursor: pointer;
  user-select: none;
  word-break: break-word;
}

.text.line-through {
  text-decoration: line-through;
  color: #9ca3af;
}

.edit-input {
  width: 100%;
  padding: 4px 8px;
  border: 2px solid #3b82f6;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  background: white;
}

.delete-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 0.7;
}

.delete-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}

.todo-item:not(:hover) .delete-btn {
  opacity: 0.3;
}
</style>
