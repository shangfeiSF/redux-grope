let ID = 0

// 增加事项动作
export const add = (text) => ({
  type: 'ADD',
  id: ID++,
  text
})

// 筛选事项动作
export const filter = (filter) => ({
  type: 'FILTER',
  filter
})

// 转换待办/完成状态动作
export const toggle = (id) => ({
  type: 'TOGGLE',
  id
})