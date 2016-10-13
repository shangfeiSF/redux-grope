import {connect} from 'react-redux'
import {ActionCreators as UndoActionCreators} from 'redux-undo'

import UndoRedo from '../components/UndoRedo'

const mapStateToProps = (state) => ({
  canUndo: state.addAndToggle.past.length > 0,
  canRedo: state.addAndToggle.future.length > 0
})

const mapDispatchToProps = ({
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo)