import React, {Component, PropTypes} from 'react'

class Link extends Component {
  constructor(props, context) {
    super(props, context)

    this.handlerOnClick = this.handlerOnClick.bind(this)
  }

  static propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
  }

  handlerOnClick(e) {
    e.preventDefault()
    this.props.onClick()
  }

  render() {
    let {active, children} = this.props
    let block = active ? (
      <span>{children}</span>
    ) : (
      <a href="#" onClick={this.handlerOnClick}>{children}</a>
    )

    return block
  }
}

export default Link