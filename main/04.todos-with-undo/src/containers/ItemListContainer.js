/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {connect} from 'react-redux';

import ItemList from '../components/ItemList';

import {toggle} from '../actions';

// TODO：SHOW_ALL、SHOW_ACTIVE、SHOW_COMPLETED need define in one place.
const FILTERS = [
    {FILTER: 'SHOW_ALL'},
    {FILTER: 'SHOW_ACTIVE'},
    {FILTER: 'SHOW_COMPLETED'}
];

const filterHandler = (addAndToggle, filter) => {
    switch (filter) {
        case FILTERS[0].FILTER:
            return addAndToggle;

        case FILTERS[1].FILTER:
            return addAndToggle.filter(item => !item.completed);

        case FILTERS[2].FILTER:
            return addAndToggle.filter(item => item.completed);

        default:
            throw new Error('Unknown the filter: ' + filter);
    }
};

const mapStateToProps = state => ({
    items: filterHandler(state.addAndToggle.present, state.filter)
})

const mapDispatchToProps = {onItemClick: toggle};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
