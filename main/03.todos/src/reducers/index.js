/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {combineReducers} from 'redux';

/*
 * One of the important skill in Redux is split the reducer to manage state.
 * 1. Each reducer just manages the matched part in state.
 * 2. Each reducer has a parameters named state which is matched one part of state.
 * With the size of APP to be larger, each reducer to be a module and handle the matched part of state
 * With spliting the reducer, the state is designed:
 * */

import addAndToggle from './modules/addAndToggle';
import filter from './modules/filter';

export default combineReducers({
    // The combineReducers set a key named addAndToggle for the addAndToggle reducer.
    addAndToggle,
    // The combineReducers set a key named filter for the filter reducer.
    filter
})