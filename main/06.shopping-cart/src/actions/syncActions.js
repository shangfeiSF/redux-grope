import * as types from '../constants/ActionTypes'

export const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products: products
})

export const addToCart = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const checkRequest = () => ({
  type: types.CHECKOUT_REQUEST,
})

export const checkSuccess = (cart, msg) => ({
  type: types.CHECKOUT_SUCCESS,
  cart: cart,
  msg: msg
})

export const checkFailure = (cart, msg) => ({
  type: types.CHECKOUT_FAILURE,
  cart: cart,
  msg: msg
})