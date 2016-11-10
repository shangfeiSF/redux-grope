import  * as products from '../../../../main/06.shopping-cart/src/api/products.json'
import * as types from '../../../../main/06.shopping-cart/src/constants/ActionTypes'
import * as syncActions from '../../../../main/06.shopping-cart/src/actions/syncActions'

describe('syncActions', () => {
  it('receiveProducts should create `RECEIVE_PRODUCTS` action', () => {
    let expectedValue = {
      type: types.RECEIVE_PRODUCTS,
      products: products.default
    }

    let receivedValue = syncActions.receiveProducts(products.default)

    expect(receivedValue).toEqual(expectedValue)
  })

  it('addToCart should create `ADD_TO_CART` action', () => {
    let productId = 1

    let expectedValue = {
      type: types.ADD_TO_CART,
      productId
    }

    let receivedValue = syncActions.addToCart(productId)

    expect(receivedValue).toEqual(expectedValue)
  })

  it('checkRequest should create `CHECKOUT_REQUEST` action', () => {
    let expectedValue = {
      type: types.CHECKOUT_REQUEST,
    }

    let receivedValue = syncActions.checkRequest()

    expect(receivedValue).toEqual(expectedValue)
  })

  it('checkSuccess should create `CHECKOUT_SUCCESS` action', () => {
    let cart = {
      info: 'This is a cart'
    }
    let msg = 'checkSuccess'

    let expectedValue = {
      type: types.CHECKOUT_SUCCESS,
      cart,
      msg
    }

    let receivedValue = syncActions.checkSuccess(cart, msg)

    expect(receivedValue).toEqual(expectedValue)
  })

  it('checkFailure should create `CHECKOUT_FAILURE` action', () => {
    let cart = {
      info: 'This is a cart'
    }
    let msg = 'checkFailure'

    let expectedValue = {
      type: types.CHECKOUT_FAILURE,
      cart,
      msg
    }

    let receivedValue = syncActions.checkFailure(cart, msg)

    expect(receivedValue).toEqual(expectedValue)
  })
})