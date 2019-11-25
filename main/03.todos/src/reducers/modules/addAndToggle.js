/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

// TODO：ADD、FILTER、TOGGLE need defines in one place.
const ADD = 'ADD';
const TOGGLE = 'TOGGLE';

const initState = [];

export default (state = initState, action) => {
    switch (action.type) {
        case ADD:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];

        case TOGGLE:
            return state.map(
                item => item.id === action.id
                    ? {...item, completed: !item.completed}
                    : item
            );

        default:
            return state
    }
}