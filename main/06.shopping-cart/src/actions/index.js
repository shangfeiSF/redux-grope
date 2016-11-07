import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

const creaters = {
  receiveProducts: products => ({
    type: types.RECEIVE_PRODUCTS,
    products: products
  }),

  addToCartUnsafe: productId => ({
    type: types.ADD_TO_CART,
    productId
  })
}

/*
 * (1) An thunk-type action creater that returns a function to perform asynchronous dispatch
 * (2) An thgunk-type action creater that returns a function to perform conditional dispatch
 * */

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(creaters.receiveProducts(products))
  })
}

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(creaters.addToCartUnsafe(productId))
  }
}

export const checkout = products => (dispatch, getState) => {
  const {cart} = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })

  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
  })
}