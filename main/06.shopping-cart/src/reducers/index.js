import {combineReducers} from 'redux'

import cart, {APIs as Cart_APIs} from './modules/cart'
import products, {APIs as Products_APIs} from './modules/products'

const addedIds = state => Cart_APIs.get_addedIds(state.cart)
const quantity = (state, id) => Cart_APIs.get_quantity(state.cart, id)

const productDetail = (state, id) => Products_APIs.get_productDetail(state.products, id)

export const valuate = state => addedIds(state)
  .reduce((total, id) => total + productDetail(state, id).price * quantity(state, id), 0)
  .toFixed(2)

export const productsInCart = state => addedIds(state)
  .map(id => ({
    ...productDetail(state, id),
    quantity: quantity(state, id)
  }))

export default combineReducers({
  cart,
  products
})