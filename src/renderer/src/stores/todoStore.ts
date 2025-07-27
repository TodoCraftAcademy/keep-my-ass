import { defineStore } from 'pinia'
import { Todo, TodoFilter, TodoInput, createTodo } from '../types/Todo'

export interface TodoState {
  todos: Todo[]
  filter: TodoFilter
  history: Todo[][]
}

// 将 store 重命名为 useTodoStore 并更新ID为 'todo'，以更准确地反映其功能
export const useTodoStore = defineStore('todo', {
  state: (): TodoState => ({
    todos: [],
    filter: TodoFilter.ALL,
    history: []
  }),

  getters: {
    /**
     * 根据当前筛选条件，返回处理后的待办事项列表
     * @param {TodoState} state - Pinia store 的 state
     * @returns {Todo[]} - 过滤后的待办事项数组
     */
    filteredTodos(state: TodoState): Todo[] {
      switch (state.filter) {
        case TodoFilter.ACTIVE:
          return state.todos.filter((todo) => !todo.completed)
        case TodoFilter.COMPLETED:
          return state.todos.filter((todo) => todo.completed)
        default:
          return state.todos
      }
    },

    /**
     * 计算并返回未完成的待办事项数量
     * @param {TodoState} state - Pinia store 的 state
     * @returns {number} - 未完成任务的数量
     */
    activeTodoCount(state: TodoState): number {
      return state.todos.reduce((count, todo) => {
        return todo.completed ? count : count + 1
      }, 0)
    }
  },

  actions: {
    /**
     * 将当前状态保存到历史记录中，用于撤销操作
     * @private
     */
    _saveState() {
      this.history.push(this.todos)
    },
    /**
     * 创建并添加一个新的待办事项
     * @param {string} text - 新待办事项的文本内容
     */
    addTodo(text: string) {
      this._saveState()
      if (!text.trim()) {
        return // 不添加空白任务
      }
      const newTodoInput: TodoInput = {
        text: text,
        completed: false
      }
      const newTodo = createTodo(newTodoInput)
      this.todos.push(newTodo)
    },

    /**
     * 根据ID从列表中删除一个待办事项
     * @param {string} id - 要删除的待办事项的ID
     */
    removeTodo(id: string) {
      this._saveState()
      this.todos = this.todos.filter((todo) => todo.id !== id)
    },

    /**
     * 切换指定ID的待办事项的完成状态
     * @param {string} id - 要切换状态的待办事项的ID
     */
    toggleTodo(id: string) {
      this._saveState()
      const todo = this.todos.find((t) => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
        todo.updatedAt = new Date()
      }
    },
    /**
     * 更新指定ID的待办事项的文本内容
     * @param {string} id - 要更新的待办事项的ID
     * @param {string} text - 新的文本内容
     */
    updateTodoText(id: string, text: string) {
      this._saveState()
      if (!text.trim()) {
        this.removeTodo(id)
        return
      }
      const todo = this.todos.find((t) => t.id === id)
      if (todo) {
        todo.text = text
        todo.updatedAt = new Date()
      }
    },

    /**
     * 设置当前视图的筛选条件
     * @param {TodoFilter} filter - 新的筛选条件
     */
    setFilter(filter: TodoFilter) {
      this.filter = filter
    },
    /**
     * 切换所有待办事项的完成状态
     * @param {boolean} completed - 新的完成状态
     */
    toggleAll(completed: boolean) {
      this._saveState()
      this.todos.forEach((t) => {
        t.completed = completed
        t.updatedAt = new Date()
      })
    },
    undo() {
      if (this.history.length > 0) {
        this.todos = this.history.pop()!
      }
    },
    /**
     * 从持久化存储中加载待办事项列表
     * @param {Todo[]} todos - 从外部（如文件）加载的待办事项数组
     */
    loadTodos(todos: Todo[]) {
      this.todos = todos.map((todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt)
      }))
    }
  }
})
