import React, {Component} from 'react'
import PropTypes from 'prop-types'

import ProductInfo from './ProductInfo'

class ProductItem extends Component {
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired
    }).isRequired,

    addToCart: PropTypes.func.isRequired
  }

  handlerOnClick = () => {
    let {product, addToCart} = this.props
    addToCart(product.id)
  }

  render() {
    let {product} = this.props
    let inventory = product.inventory > 0

    return (
      <ul style={{marginBottom: 10}}>
        <ProductInfo key={product.id} product={product}/>

        <button onClick={this.handlerOnClick} disabled={inventory ? '' : 'disabled'}>
          {inventory ? 'Add to cart now' : 'Sold Out'}
        </button>
      </ul>
    )
  }
}

export default ProductItem