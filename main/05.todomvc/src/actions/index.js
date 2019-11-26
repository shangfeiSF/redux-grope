/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {ADD, DELETE, EDIT, COMPLETE, COMPLETE_ALL, CLEAR_COMPLETED} from '../constants/ActionTypes';

// The action creators are named with underline both at the begin and the end.
export const _add_ = text => ({type: ADD, text});

export const _delete_ = id => ({type: DELETE, id});

export const _edit_ = (id, text) => ({type: EDIT, id, text});

export const _complete_ = id => ({type: COMPLETE, id});

export const _completeAll_ = () => ({type: COMPLETE_ALL});

export const _clearCompleted_ = () => ({type: CLEAR_COMPLETED});
