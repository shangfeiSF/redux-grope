/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

const FILTER = 'FILTER';

const initState = 'SHOW_ALL';

export default (state = initState, action) => {
    switch (action.type) {
        case FILTER:
            return action.filter

        default:
            return state
    }
}