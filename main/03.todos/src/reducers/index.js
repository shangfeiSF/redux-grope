/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {combineReducers} from 'redux';

/*
 * 拆分reducer是Redux管理state的一个重要模式
 * (1) 每个reducer只负责管理全局state中与之相关的部分
 * (2) 每个reducer的state参数都不同，具体对应到全局state中与之相关的部分(与combineReducers有关)
 * 随着应用的扩展，将拆分后的每个reducer模块化, 保持其独立性，用于专门处理不同的state数据域
 *
 * 拆分reducer的同时，也是在设计Redux的state对象，即：
 * Redux提供combineReducers只是生成一个函数，这个函数来调用每一个reducer，调用每个reducer时
 * 首先，会根据combineReducers分配的key来匹配出state中与之对应的部分，这部分作为reducer的state参数传入并执行reducer
 * 然后，这个生成的函数再将所有reducer的结果合并成全局state
 * */

import addAndToggle from './modules/addAndToggle';
import filter from './modules/filter';

export default combineReducers({
    // combineReducers为addAndToggle在全局state中分配的key就是addAndToggle
    addAndToggle,
    // combineReducers为filter在全局state中分配的key就是filter
    filter
})