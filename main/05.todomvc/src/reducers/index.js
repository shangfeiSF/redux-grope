/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {combineReducers} from 'redux';

import base from './modules/base';

export default combineReducers({todos: base});
