import React, {Component, PropTypes} from 'react'

class Todo extends Component {
  constructor(props, context) {
    super(props, context)

    this.handlerOnClick = this.handlerOnClick.bind(this)
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  }

  handlerOnClick(e) {
    e.preventDefault()
    this.props.onClick()
  }

  render() {
    let {completed, text} = this.props
    let style = {textDecoration: completed ? 'line-through' : 'none'}

    return (
      <li style={style} onClick={this.handlerOnClick}>{text}</li>
    )
  }
}

export default Todo