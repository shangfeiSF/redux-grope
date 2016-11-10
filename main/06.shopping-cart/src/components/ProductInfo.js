import React, {Component, PropTypes} from 'react'

class ProductInfo extends Component {
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired
    }).isRequired,
  }

  render() {
    let {product} = this.props

    return (
      <li style={{ fontSize: 20, marginBottom: 10 }}>
        {product.title} - &#36;{product.price}{product.quantity ? ` x ${product.quantity}` : 0}
      </li>
    )
  }
}

export default ProductInfo