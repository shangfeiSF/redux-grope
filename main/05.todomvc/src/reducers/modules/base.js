/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {ADD, DELETE, EDIT, COMPLETE, COMPLETE_ALL, CLEAR_COMPLETED} from '../../constants/ActionTypes';

const initialState = [{id: 0, text: 'Use Redux', completed: false}];

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD:
            return [
                ...state,
                {
                    id: state.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1,
                    text: action.text,
                    completed: false
                }
            ];

        case DELETE:
            return state.filter(item => item.id !== action.id);

        case EDIT:
            return state.map(item => item.id === action.id ? {...item, text: action.text} : item);

        case COMPLETE:
            return state.map(item => item.id === action.id ? {...item, completed: !item.completed} : item);

        case COMPLETE_ALL:
            const areAllMarked = state.every(item => item.completed);

            return state.map(item => ({...item, completed: !areAllMarked}));

        case CLEAR_COMPLETED:
            return state.filter(item => item.completed === false);

        default:
            return state;
    }
};
