/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

let ID = 0;

const ADD = 'ADD';
const FILTER = 'FILTER';
const TOGGLE = 'TOGGLE';

export const add = text => ({type: 'ADD', id: ID++, text});

export const filter = filter => ({type: FILTER, filter});

export const toggle = id => ({type: TOGGLE, id});
