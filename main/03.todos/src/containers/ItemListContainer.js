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
}

/*
* The container component and the presentational component cooperate as follow:
* 1. The container component defines some stateToProps for the presentational component just with state.
* 2. The container component defines some dispatchToProp for the presentational component.
* 3. The dispatchToProp is auto-dispath with toggle action creator when called by the presentational component.
* 4. The presentational component calculates the parameters and calls the dispatchToProp.
* */

const mapStateToProps = state => ({
    items: filterHandler(state.addAndToggle, state.filter)
})

const mapDispatchToProps = {onItemClick: toggle};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
