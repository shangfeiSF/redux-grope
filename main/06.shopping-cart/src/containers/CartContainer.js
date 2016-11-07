import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {checkout} from '../actions'
import {getCartProducts, getTotal} from '../reducers'

import Cart from '../components/Cart'

class CartContainer extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
      })
    ).isRequired,

    total: PropTypes.string,

    checkout: PropTypes.func.isRequired
  }

  render() {
    let {products, total, checkout} = this.props

    return (
      <Cart
        products={products}
        total={total}
        onCheckoutClicked={() => checkout(products)}/>
    )
  }
}

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
})

export default connect(
  mapStateToProps,
  {checkout}
)(CartContainer)