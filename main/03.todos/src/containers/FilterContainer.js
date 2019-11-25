/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {connect} from 'react-redux';

import Filter from '../components/Filter';

import {filter} from '../actions';

/*
* The container component and the presentational component cooperate as follow:
* 1. The container component defines some stateToProps for the presentational component with both state and ownProps of the container component.
* 2. The container component defines some dispatchToProp for the presentational component.
* 4. The dispatchToProp do not need any parameters from the presentational component, but need the props from The container component.
* */

const mapStateToProps = (state, ownProps) => ({
    active: state.filter === ownProps.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch(filter(ownProps.filter));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
