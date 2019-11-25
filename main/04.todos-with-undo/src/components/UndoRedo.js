/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UndoRedo extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        canUndo: PropTypes.bool.isRequired,
        canRedo: PropTypes.bool.isRequired,
        onUndo: PropTypes.func.isRequired,
        onRedo: PropTypes.func.isRequired
    }

    handlerOnUndoClick = () => {
        this.props.canUndo && this.props.onUndo();
    }

    handlerOnRedoClick = () => {
        this.props.canRedo && this.props.onRedo();
    }

    render() {
        return (
            <p>
                <button onClick={this.handlerOnUndoClick} disabled={!this.props.canUndo}>Undo</button>
                <button onClick={this.handlerOnRedoClick} disabled={!this.props.canRedo}>Redo</button>
            </p>
        );
    }
}

export default UndoRedo;
