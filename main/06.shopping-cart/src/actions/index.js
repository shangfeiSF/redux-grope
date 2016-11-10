import shop from '../api/shop'
import * as syncActions  from './syncActions'

// getAllProducts that returns a function to perform asynchronous dispatch
export const getAllProducts = () => dispatch => {
  return shop.getProducts().then(
    response => {
      return dispatch(syncActions.receiveProducts(response.products))
    },
    response => {
      return dispatch(syncActions.receiveProducts(response.products))
    }
  )
}

// addToCart that returns a function to perform conditional dispatch
export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.details[productId].inventory > 0) {
    return dispatch(syncActions.addToCart(productId))
  } else {
    return false
  }
}

// checkout that returns a function to perform conditional and asynchronous dispatch
export const checkout = manifest => (dispatch, getState) => {
  const {cart} = getState()

  dispatch(syncActions.checkRequest())

  return shop.buyProducts(manifest).then(
    response => {
      return dispatch(syncActions.checkSuccess(cart, response.msg))
    },
    response => {
      return dispatch(syncActions.checkFailure(cart, response.msg))
    })
}