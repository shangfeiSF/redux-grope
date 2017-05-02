import React, {Component, PropTypes} from 'react'

class Item extends Component {
  constructor(props, context) {
    super(props, context)
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  }

  handlerOnClick = (e) => {
    e.preventDefault()
    let {id, onClick} = this.props

    onClick(id)
  }

  render() {
    let {completed, text} = this.props
    let style = {
      textDecoration: completed ? 'line-through' : 'none',
      color: completed ? '#a5a5a5' : '#000'
    }

    return (
      <li style={style} onClick={this.handlerOnClick}>{text}</li>
    )
  }
}

export default Item