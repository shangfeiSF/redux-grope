/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {connect} from 'react-redux'

import Add from '../components/Add'

import {add} from '../actions'

const mapStateToProps = null

const mapDispatchToProps = {onSubmit: add};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
