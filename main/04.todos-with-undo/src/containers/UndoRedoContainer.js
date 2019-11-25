/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {connect} from 'react-redux';
import {ActionCreators} from 'redux-undo';

import UndoRedo from '../components/UndoRedo';

const mapStateToProps = state => ({
    canUndo: state.addAndToggle.past.length > 0,
    canRedo: state.addAndToggle.future.length > 0
});

const mapDispatchToProps = {
    onUndo: ActionCreators.undo,
    onRedo: ActionCreators.redo
};

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo);
