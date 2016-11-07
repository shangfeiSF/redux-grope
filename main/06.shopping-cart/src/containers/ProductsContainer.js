import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {addToCart} from '../actions'
import {getVisibleProducts} from '../reducers/modules/products'

import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'

class ProductsContainer extends Component {
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
      <ProductsList title="Products">
        {
          products.map(product =>
            <ProductItem
              key={product.id}
              product={product}
              onAddToCartClicked={() => addToCart(product.id)}
            />
          )
        }
      </ProductsList>
    )
  }
}

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
})

export default connect(
  mapStateToProps,
  {addToCart}
)(ProductsContainer)