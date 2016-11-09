import  * as products from '../../../../main/06.shopping-cart/src/api/products.json'
import * as types from '../../../../main/06.shopping-cart/src/constants/ActionTypes'
import * as actions from '../../../../main/06.shopping-cart/src/actions/index'

describe('Actions', () => {
  it('getAllProducts should return all products', () => {
    let expectedValue = {
      type: types.RECEIVE_PRODUCTS,
      products: products
    }

    var receivedValue = {}
    let dispatch = action => {
      console.log(action)
      receivedValue = action
    }

    let thunk = actions.getAllProducts()
    thunk(dispatch)

    expect(receivedValue).toEqual(expectedValue)
  })

  it('addToCart should success when inventory > 0', () => {
    let productId = 3
    let expectedValue = {
      type: types.ADD_TO_CART,
      productId
    }

    var receivedValue = {}
    let dispatch = action => {
      receivedValue = action
    }
    let getState = () => ({
      products: {
        details: {
          3: {
            inventory: 10
          }
        }
      }
    })

    let thunk = actions.addToCart(productId)
    thunk(dispatch, getState)

    expect(receivedValue).toEqual(expectedValue)
  })

  it('addToCart should fail when inventory = 0', () => {
    let productId = 3
    let expectedValue = {}

    var receivedValue = {}
    let dispatch = action => {
      receivedValue = action
    }
    let getState = () => ({
      products: {
        details: {
          3: {
            inventory: 0
          }
        }
      }
    })

    let thunk = actions.addToCart(productId)
    thunk(dispatch, getState)

    expect(receivedValue).toEqual(expectedValue)
  })

  // it('checkout should success or fail with correct response', () => {
  //   let manifest = {
  //     info: 'This is manifest'
  //   }
  //   let cart = {
  //     info: 'This is cart'
  //   }
  //
  //   let expectedValueWhenSuccess = {
  //     type: types.CHECKOUT_SUCCESS,
  //     cart: cart,
  //     msg: 'Buy Success'
  //   }
  //   let expectedValueWhenFail = {
  //     type: types.CHECKOUT_FAILURE,
  //     cart: cart,
  //     msg: 'Server error'
  //   }
  //
  //   let thunk = actions.checkout(manifest)
  //
  //   let dispatch = action => action
  //   let getState = () => cart
  //
  //   expect(thunk(dispatch, getState))
  //     .toEqual(expectedValueWhenSuccess)
  // })
})