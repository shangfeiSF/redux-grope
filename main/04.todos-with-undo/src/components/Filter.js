import React, {Component, PropTypes} from 'react'

class Filter extends Component {
  constructor(props, context) {
    super(props, context)

    this.handlerOnClick = this.handlerOnClick.bind(this)
  }

  static propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
  }

  handlerOnClick = (e) => {
    e.preventDefault()
    /*
     * 容器组件和展示组件的配合方式-2：
     * 容器组件封装后的dispatch()，展示组件直接调用
     * */
    // this.props.onClick(this.props.filter)
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

export default Filter