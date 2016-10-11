let ID = 0

/*
 * action本质上是JavaScript普通对象
 * action创建函数本质上是生成action的方法
 * Redux约定，action内必须使用一个字符串类型的type字段来表示将要执行的动作，除type字段外，action的结构完全自由
 * action只是描述了有事情发生，并没有指明应用如何更新state
 * Redux约定，reducer是一个纯函数，接收旧的state和action，返回新的state，同Flux的表述 (old_state, action) => new_state
 * */

// add action创建函数（增加事项）
export const add = (text) => ({
  // 返回一个action
  type: 'ADD',
  id: ID++,
  text
})

// filter action创建函数（筛选事项）
export const filter = (filter) => ({
  // 返回一个action
  type: 'FILTER',
  filter
})

// toggle action创建函数（转换待办/完成状态）
export const toggle = (id) => ({
  // 返回一个action
  type: 'TOGGLE',
  id
})