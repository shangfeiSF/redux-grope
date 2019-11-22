/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React from 'react';

/*
 *  展示组件: container/*.js
 *  位置: 中间/子组件
 *  使用Redux: 否
 * 	读取数据: 从props获取数据
 * 	修改数据: 从props调用回调函数
 * */

// 展示组件: App => 展示组件: FilterList
import FilterList from './FilterList';

/*
 * 	容器组件: components/*.js
 * 	位置: 最顶层，负责路由处理
 * 	使用Redux: 是
 * 	读取数据: 从Redux获取state
 * 	修改数据: 向Redux发起actions
 * */

// 展示组件: App => 容器组件： ItemListContainer和AddContainer
import ItemListContainer from '../containers/ItemListContainer';
import AddContainer from '../containers/AddContainer';

/*
 * App或使用展示组件，或使用容器组件
 * App -- FilterList -- FilterContainer(Filter)
 *     -- ItemListContainer(ItemList -- Item)
 *     -- AddContainer(Add)
 * */

const App = () => (
    <div>
        <FilterList/>
        <ItemListContainer/>
        <AddContainer/>
    </div>
);

export default App;
