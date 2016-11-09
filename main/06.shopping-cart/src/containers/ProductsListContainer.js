import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import ProductsList from '../components/ProductsList'

import {addToCart} from '../actions'
import {APIs} from '../reducers/modules/products'

const mapStateToProps = state => ({
  products: APIs.get_visibleProducts(state.products)
})

export default connect(
  mapStateToProps,
  {addToCart}
)(ProductsList)