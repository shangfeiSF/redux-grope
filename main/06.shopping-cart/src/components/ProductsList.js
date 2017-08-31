import React, {Component} from 'react'
import PropTypes from 'prop-types'

import ProductItem from '../components/ProductItem'

class ProductsList extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired
      })
    ).isRequired,

    addToCart: PropTypes.func.isRequired
  }

  render() {
    let {products, addToCart} = this.props

    return (
      <div>
        <h1>Products</h1>
        <div>{
          products.map(product =>
            <ProductItem
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          )
        }</div>
      </div>
    )
  }
}

export default ProductsList