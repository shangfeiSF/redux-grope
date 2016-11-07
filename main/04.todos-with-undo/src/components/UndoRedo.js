import React, {Component, PropTypes} from 'react'

class UndoRedo extends Component {
  constructor(props, context) {
    super(props, context)

    this.handlerOnUndoClick = this.handlerOnUndoClick.bind(this)
    this.handlerOnRedoClick = this.handlerOnRedoClick.bind(this)
  }

  static propTypes = {
    canUndo: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired,
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired
  }

  handlerOnUndoClick() {
    this.props.canUndo && this.props.onUndo()
  }

  handlerOnRedoClick() {
    this.props.canRedo && this.props.onRedo()
  }

  render() {
    let {canUndo, canRedo} = this.props

    return (
      <p>
        <button onClick={this.handlerOnUndoClick} disabled={!canUndo}>Undo</button>
        <button onClick={this.handlerOnRedoClick} disabled={!canRedo}>Redo</button>
      </p>
    )
  }
}

export default UndoRedo