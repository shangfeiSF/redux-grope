/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {connect} from 'react-redux';

import Add from '../components/Add';

import {add} from '../actions';

/*
* The container component and the presentational component cooperate as follow:
* 1. The container component does not define any stateToProps for the presentational component.
* 2. The container component defines some dispatchToProp for the presentational component.
* 3. The dispatchToProp is auto-dispath with add action creator when called by the presentational component.
* 4. The presentational component calculates the parameters and calls the dispatchToProp.
* */

const mapStateToProps = null;

const mapDispatchToProps = {onSubmit: add};

export default connect(mapStateToProps, mapDispatchToProps)(Add);