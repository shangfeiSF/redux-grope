import * as types from '../../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {}
}

const update = {
  addedIds: (state = initialState.addedIds, action) => {
    switch (action.type) {
      case types.ADD_TO_CART:
        return state.indexOf(action.productId) !== -1 ? state : [...state, action.productId]

      default:
        return state
    }
  },

  quantityById: (state = initialState.quantityById, action) => {
    switch (action.type) {
      case types.ADD_TO_CART:
        const {productId} = action

        return {
          ...state,
          [productId]: (state[productId] || 0) + 1
        }

      default:
        return state
    }
  }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECKOUT_SUCCESS:
      return initialState

    case types.CHECKOUT_FAILURE:
      return action.cart

    default:
      return {
        addedIds: update.addedIds(state.addedIds, action),
        quantityById: update.quantityById(state.quantityById, action)
      }
  }
}

export const APIs = {
  get_addedIds: state => state.addedIds,

  get_quantity: (state, productId) => state.quantityById[productId] || 0
}

export default cart