import  * as products from '../../../../main/06.shopping-cart/src/api/products.json'
import * as types from '../../../../main/06.shopping-cart/src/constants/ActionTypes'
import * as actions from '../../../../main/06.shopping-cart/src/actions/index'

describe('Actions', () => {
  it('getAllProducts should return all products', async() => {
    let expectedValue = {
      type: types.RECEIVE_PRODUCTS,
      products: products.default
    }

    let dispatch = action => action

    let thunk = actions.getAllProducts()
    let receivedValue = await thunk(dispatch)

    expect(receivedValue).toEqual(expectedValue)
  })

  it('addToCart should success when inventory > 0', async() => {
    let productId = 3

    let expectedValue = {
      type: types.ADD_TO_CART,
      productId
    }

    let dispatch = action => action
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
    let receivedValue = await thunk(dispatch, getState)

    expect(receivedValue).toEqual(expectedValue)
  })

  it('addToCart should fail when inventory = 0', async() => {
    let productId = 3

    let expectedValue = false

    let dispatch = action => action
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
    let receivedValue = await thunk(dispatch, getState)

    expect(receivedValue).toEqual(expectedValue)
  })

  it('checkout should success or fail with correct response', async() => {
    let manifest = {
      info: 'This is manifest'
    }
    let cart = {
      info: 'This is cart'
    }

    let expectedValueWhenSuccess = {
      type: types.CHECKOUT_SUCCESS,
      cart: cart,
      msg: 'Buy Success'
    }
    let expectedValueWhenFail = {
      type: types.CHECKOUT_FAILURE,
      cart: cart,
      msg: 'Server error'
    }

    let dispatch = action => action
    let getState = () => ({
      cart
    })

    let thunk = actions.checkout(manifest)
    let receivedValue = await thunk(dispatch, getState)

    try {
      expect(receivedValue).toEqual(expectedValueWhenSuccess)
    } catch (e) {
      expect(receivedValue).toEqual(expectedValueWhenFail)
    }
  })
})