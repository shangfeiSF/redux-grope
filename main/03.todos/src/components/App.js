import React from 'react'

import FilterLinkList from './FilterLinkList'

import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

/*
 * 	容器组件：components/*.js
 * 	位置---最顶层，负责路由处理
 * 	使用Redux---是
 * 	读取数据---	从 Redux 获取 state
 * 	修改数据---向 Redux 发起 actions
 *
 *  展示组件：	container/*.js
 *  位置---中间和子组件
 *  使用Redux---否
 * 	读取数据---从 props 获取数据
 * 	修改数据---从 props 调用回调函数
 * */

/* 展示组件App中调用容器组件AddTodo */
/* 展示组件App中调用展示组件FilterLinkList */
const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <FilterLinkList />
  </div>
)

export default App