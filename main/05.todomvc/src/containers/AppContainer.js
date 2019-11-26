/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';

import App from '../components/App';

import * as actions from '../actions';

const mapStateToProps = state => ({todos: state.todos});

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(App);
