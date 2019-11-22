/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

let ID = 0;

/*
 * The action object is just a normal object.
 * We use action creators to make action object.
 * In Redux, the action object must contains a string field named type to define the action.
 * The fields of action object are self-defined except the type field.
 * The action object just describes some action has happend, but not describes how to update the state.
 * In Redux, the reducer is pure function which receives the old state and the action object and returns the new state.
 * The reducer is like (oldState, actionObject) => newState
 * */

const ADD = 'ADD';
const FILTER = 'FILTER';
const TOGGLE = 'TOGGLE';

export const add = text => ({type: ADD, id: ID++, text});

export const filter = filter => ({type: FILTER, filter});

export const toggle = id => ({type: TOGGLE, id});
