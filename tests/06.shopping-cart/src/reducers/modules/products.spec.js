import * as types from '../../../../../main/06.shopping-cart/src/constants/ActionTypes'
import products from '../../../../../main/06.shopping-cart/src/reducers/modules/products'

describe('reducers', () => {
  describe('products', () => {
    it('should provide the initial state', () => {
      let expectedValue = {
        details: {},
        visibleIds: []
      }

      let receivedValue = products({}, {})

      expect(receivedValue).toEqual(expectedValue)
    })

    it('should handle `RECEIVE_PRODUCTS` action', () => {
      const action = {
        type: types.RECEIVE_PRODUCTS,
        products: [
          {
            id: 1,
            title: 'Product 1'
          },
          {
            id: 2,
            title: 'Product 2'
          }
        ]
      }

      let expectedValue = {
        details: {
          1: {
            id: 1,
            title: 'Product 1'
          },
          2: {
            id: 2,
            title: 'Product 2'
          }
        },
        visibleIds: [1, 2]
      }

      let receivedValue = products({}, action)

      expect(receivedValue).toEqual(expectedValue)
    })

    it('should handle `ADD_TO_CART` action', () => {
      const state = {
        details: {
          1: {
            id: 1,
            title: 'Product 1',
            inventory: 1
          },
          2: {
            id: 2,
            title: 'Product 2',
            inventory: 5
          }
        },
        visibleIds: [1, 2]
      }

      const action = {
        type: types.ADD_TO_CART,
        productId: 1
      }

      let expectedValue = {
        details: {
          1: {
            id: 1,
            title: 'Product 1',
            inventory: 0
          },
          2: {
            id: 2,
            title: 'Product 2',
            inventory: 5
          }
        },
        visibleIds: [1, 2]
      }

      let receivedValue = products(state, action)

      expect(receivedValue).toEqual(expectedValue)
    })

    it('should handle `CHECKOUT_REQUEST` action', () => {
      const state = {
        details: {
          1: {
            id: 1,
            title: 'Product 1',
            inventory: 1
          },
          2: {
            id: 2,
            title: 'Product 2',
            inventory: 5
          }
        },
        visibleIds: [1, 2]
      }

      let expectedValue = state

      let receivedValue = products(state, {
        type: types.CHECKOUT_REQUEST,
      })

      expect(receivedValue).toEqual(expectedValue)
    })

    it('should handle `CHECKOUT_SUCCESS` action', () => {
      const state = {
        details: {
          1: {
            id: 1,
            title: 'Product 1',
            inventory: 1
          },
          2: {
            id: 2,
            title: 'Product 2',
            inventory: 5
          }
        },
        visibleIds: [1, 2]
      }

      let expectedValue = state

      let receivedValue = products(state, {
        type: types.CHECKOUT_SUCCESS,
      })

      expect(receivedValue).toEqual(expectedValue)
    })

    it('should handle `CHECKOUT_FAILURE` action', () => {
      const state = {
        details: {
          1: {
            id: 1,
            title: 'Product 1',
            inventory: 1
          },
          2: {
            id: 2,
            title: 'Product 2',
            inventory: 5
          }
        },
        visibleIds: [1, 2]
      }

      let expectedValue = state

      let receivedValue = products(state, {
        type: types.CHECKOUT_FAILURE,
      })

      expect(receivedValue).toEqual(expectedValue)
    })
  })
})
