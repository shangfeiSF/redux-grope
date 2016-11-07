import React, {Component, PropTypes} from 'react'

class ProductsList extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired
  }

  render() {
    let {title, children} = this.props

    return (
      <div>
        <h1>{title}</h1>
        <div>{children}</div>
      </div>
    )
  }
}

export default ProductsList