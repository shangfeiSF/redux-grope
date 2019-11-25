/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

// TODO：ADD、FILTER、TOGGLE need defines in one place.
const FILTER = 'FILTER';

// TODO：SHOW_ALL、SHOW_ACTIVE、SHOW_COMPLETED need define in one place.
const initState = 'SHOW_ALL';

export default (state = initState, action) => {
    switch (action.type) {
        case FILTER:
            return action.filter;

        default:
            return state;
    }
};
