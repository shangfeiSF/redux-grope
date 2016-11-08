import {combineReducers} from 'redux'

import cart, * as cartUtils from './modules/cart'
import products, * as productsUtils from './modules/products'

const getAddedIds = state => cartUtils.getAddedIds(state.cart)
const getQuantity = (state, id) => cartUtils.getQuantity(state.cart, id)

const getProduct = (state, id) => productsUtils.getProduct(state.products, id)

export const getTotal = state => getAddedIds(state)
  .reduce((total, id) => total + getProduct(state, id).price * getQuantity(state, id), 0)
  .toFixed(2)

export const getCartProducts = state => getAddedIds(state)
  .map(
    id => ({
      ...getProduct(state, id),
      quantity: getQuantity(state, id)
    })
  )

export default combineReducers({
  cart,
  products
})