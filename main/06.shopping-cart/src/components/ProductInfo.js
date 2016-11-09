import React, {Component, PropTypes} from 'react'

class ProductInfo extends Component {
  static propTypes = {
    product: PropTypes.object
  }

  render() {
    let {product} = this.props
    
    return (
      <li style={{ fontSize: 20, marginBottom: 10 }}>
        {product.title} - &#36;{product.price}{product.quantity ? ` x ${product.quantity}` : null}
      </li>
    )
  }
}

export default ProductInfo