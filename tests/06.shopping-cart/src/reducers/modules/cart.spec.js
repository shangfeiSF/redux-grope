import * as types from '../../../../../main/06.shopping-cart/src/constants/ActionTypes'
import cart from '../../../../../main/06.shopping-cart/src/reducers/modules/cart'

describe('reducers', () => {
  describe('cart', () => {
    const initialState = {
      addedIds: [],
      quantityById: {}
    }

    it('should provide the initial state', () => {
      let expectedValue = initialState

      let receivedValue = cart(undefined, {})

      expect(receivedValue).toEqual(expectedValue)
    })

    it('should handle `RECEIVE_PRODUCTS` action', () => {
      let expectedValue = initialState

      let receivedValue = cart(undefined, {
        types: types.RECEIVE_PRODUCTS
      })

      expect(receivedValue).toEqual(expectedValue)
    })

    it('should handle `ADD_TO_CART` action', () => {
      let expectedValue = {
        addedIds: [1],
        quantityById: {1: 1}
      }

      let receivedValue = cart(initialState, {
        type: types.ADD_TO_CART,
        productId: 1
      })

      expect(receivedValue).toEqual(expectedValue)
    })

    it('should handle `ADD_TO_CART` action when already in cart', () => {
      const state = {
        addedIds: [1, 2],
        quantityById: {1: 1, 2: 1}
      }

      let expectedValue = {
        addedIds: [1, 2],
        quantityById: {1: 1, 2: 2}
      }

      let receivedValue = cart(state, {
        type: types.ADD_TO_CART,
        productId: 2
      })

      expect(receivedValue).toEqual(expectedValue)
    })

    it('should handle `CHECKOUT_REQUEST` action', () => {
      let expectedValue = initialState

      let receivedValue = cart(initialState, {
        type: types.CHECKOUT_REQUEST,
      })

      expect(receivedValue).toEqual(expectedValue)
    })

    it('should handle `CHECKOUT_SUCCESS` action', () => {
      let expectedValue = initialState

      let receivedValue = cart(initialState, {
        type: types.CHECKOUT_SUCCESS,
        cart: 'cart state'
      })

      expect(receivedValue).toEqual(expectedValue)
    })

    it('should handle `CHECKOUT_FAILURE` action', () => {
      const _cart = {
        info: 'This is cart'
      }
      let expectedValue = _cart

      let receivedValue = cart(initialState, {
        type: types.CHECKOUT_FAILURE,
        cart: _cart
      })

      expect(receivedValue).toEqual(expectedValue)
    })
  })
})