/**
 * @file Todo应用的核心数据结构定义
 * @description 该文件包含了所有与Todo任务相关的数据类型、接口、枚举和验证函数，
 * 为应用的类型安全和数据一致性提供基础。
 */

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * @enum {string} TodoFilter
 * @description 定义了待办事项列表的筛选状态。
 * 用于在界面上展示不同状态的任务列表。
 */
export enum TodoFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}

/**
 * @type {TodoInput}
 * @description 用于创建新待办事项的数据结构。
 * 它从`Todo`接口中排除了所有由系统自动生成的字段（如`id`、`createdAt`等）。
 * 只包含用户需要输入的字段。
 */
export type TodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>

/**
 * @type {TodoUpdate}
 * @description 用于更新现有待办事项的数据结构。
 * `Partial<Todo>`使得所有字段都变为可选，允许只更新部分字段。
 */
export type TodoUpdate = Partial<Todo>

/**
 * @function isValidTodoInput
 * @description 验证传入的对象是否是一个有效的`TodoInput`类型。
 * @param {any} data - 需要验证的数据。
 * @returns {boolean} - 如果数据包含非空`text`和布尔型`completed`属性，则返回`true`，否则返回`false`。
 */
export const isValidTodoInput = (data: TodoInput): data is TodoInput => {
  return (
    data &&
    typeof data.text === 'string' &&
    data.text.trim() !== '' &&
    typeof data.completed === 'boolean'
  )
}

/**
 * @function createTodo
 * @description 工厂函数：基于输入内容创建一个完整的Todo对象。
 * @param {TodoInput} input - 创建新待办事项所需的用户输入数据。
 * @returns {Todo} - 一个包含所有系统生成字段的完整Todo对象。
 * @throws {Error} - 如果传入的`input`无效，则抛出错误。
 */
export const createTodo = (input: TodoInput): Todo => {
  if (!isValidTodoInput(input)) {
    throw new Error('无效的Todo输入数据,必须包含非空的text和completed状态。')
  }

  const now = new Date()
  return {
    id: crypto.randomUUID(),
    text: input.text,
    completed: input.completed,
    createdAt: now,
    updatedAt: now
  }
}
