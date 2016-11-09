import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import Cart from '../components/Cart'

import {checkout} from '../actions'
import {productsInCart, valuate} from '../reducers'

const mapStateToProps = (state) => ({
  products: productsInCart(state),
  total: valuate(state)
})

export default connect(
  mapStateToProps,
  {checkout}
)(Cart)