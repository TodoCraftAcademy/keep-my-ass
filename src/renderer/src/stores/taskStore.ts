import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as string[]
  }),

  getters: {
    taskCount: (state) => state.tasks.length
  },

  actions: {
    addTask(task: string) {
      this.tasks.push(task)
    },

    removeTask(index: number) {
      this.tasks.splice(index, 1)
    }
  }
})
