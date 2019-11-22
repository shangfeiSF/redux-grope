/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export default (state, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            return state;
    }
}