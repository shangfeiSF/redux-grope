import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Counter from '../components/Counter'

import * as syncActions from '../actions/syncActions'
import * as thunkActions from '../actions/thunkActions'

const mapStateToProps = (state) => ({
  counter: state.counter
})

const mapDispatchToProps = dispatch => ({
  syncActions: bindActionCreators(syncActions, dispatch),

  thunkActions: bindActionCreators(thunkActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
