/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {connect} from 'react-redux';

import Add from '../components/Add';

import {add} from '../actions';

/*
* The container component and the presentational component cooperate by two steps as follow:
* 1. The container component passes the action creator named onSubmit.
* 2. The presentational component calculates the parameters and calls the action creator
* */

const mapStateToProps = null;

const mapDispatchToProps = {onSubmit: add};

export default connect(mapStateToProps, mapDispatchToProps)(Add);