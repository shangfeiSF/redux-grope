import {combineReducers} from 'redux'

import cart from './modules/cart'
import products from './modules/products'

export default combineReducers({
  cart,
  products
})