import shop from '../api/shop'
import * as syncActions  from './syncActions'

// getAllProducts that returns a function to perform asynchronous dispatch
export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(syncActions.receiveProducts(products))
  })
}

// addToCart that returns a function to perform conditional dispatch
export const addToCart = productId => (dispatch, getState) => {
  getState().products.details[productId].inventory > 0 && dispatch(syncActions.addToCart(productId))
}

// checkout that returns a function to perform conditional and asynchronous dispatch
export const checkout = manifest => (dispatch, getState) => {
  const {cart} = getState()

  dispatch(syncActions.checkRequest())

  shop.buyProducts(manifest, (response) => {

    if (response.status == 200) {
      dispatch(syncActions.checkSuccess(cart, response.msg))
    } else {
      dispatch(syncActions.checkFailure(cart, response.msg))
    }
  })
}