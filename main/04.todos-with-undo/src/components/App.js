import React from 'react'

/* 展示组件App中调用展示组件FilterList */
import FilterList from './FilterList'

/* 展示组件App中调用容器组件ItemListContainer、AddContainer */
import ItemListContainer from '../containers/ItemListContainer'
import AddContainer from '../containers/AddContainer'
import UndoRedoContainer from '../containers/UndoRedoContainer'

/*
 * 	容器组件：components/*.js
 * 	位置---最顶层，负责路由处理
 * 	使用Redux---是
 * 	读取数据---	从 Redux 获取 state
 * 	修改数据---向 Redux 发起 actions
 * */
/*
 *  展示组件：	container/*.js
 *  位置---中间和子组件
 *  使用Redux---否
 * 	读取数据---从 props 获取数据
 * 	修改数据---从 props 调用回调函数
 * */

/*
 * App要么直接使用展示组件，要么使用容器组件
 * App -- FilterList -- FilterContainer(Filter)
 *         -- ItemListContainer(ItemList) -- Item
 *         -- AddContainer(Add)
 *         -- UndoRedoContainer(UndoRedo)
 * */
const App = () => (
  <div>
    <FilterList />
    <ItemListContainer />
    <AddContainer />
    <UndoRedoContainer />
  </div>
)

export default App