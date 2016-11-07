import React, {Component, PropTypes} from 'react'
import Product from './Product'

class ProductItem extends Component {
  static propTypes = {
    product: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired
    }).isRequired,

    onAddToCartClicked: PropTypes.func.isRequired
  }

  render() {
    let {product, onAddToCartClicked} = this.props

    let style = {
      marginBottom: 10
    }

    return (
      <ul style={style}>
        <Product
          title={product.title}
          price={product.price}
        />

        <button
          onClick={onAddToCartClicked}
          disabled={product.inventory > 0 ? '' : 'disabled'}
        >
          {product.inventory > 0 ? 'Add to cart now' : 'Sold Out'}
        </button>
      </ul>
    )
  }
}

export default ProductItem