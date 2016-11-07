import React, {Component, PropTypes} from 'react'

class Product extends Component {
  static propTypes = {
    price: PropTypes.number,
    quantity: PropTypes.number,
    title: PropTypes.string
  }

  render() {
    let {price, quantity, title} = this.props

    let style = {
      fontSize: 20,
      marginBottom: 10
    }

    return (
      <li style={style}>
        {title} - &#36;{price}{quantity ? ` x ${quantity}` : null}
      </li>
    )
  }
}

export default Product