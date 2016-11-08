import {combineReducers} from 'redux'

import * as types from '../../constants/ActionTypes'

const update = {
  product: (state, action) => {
    switch (action.type) {
      case types.ADD_TO_CART:
        return {
          ...state,
          inventory: state.inventory - 1
        }

      default:
        return state
    }
  }
}

const details = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce(
          (map, product) => {
            map[product.id] = product
            return map
          },
          {}
        )
      }

    case types.ADD_TO_CART:
      const {productId} = action

      return {
        ...state,
        [productId]: update.product(state[productId], action)
      }

    default:
      return state
  }
}

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_PRODUCTS:
      return action.products.map(product => product.id)

    default:
      return state
  }
}

export const getProduct = (state, id) => state.details[id]

export const getVisibleProducts = state => state.visibleIds.map(id => getProduct(state, id))

export default combineReducers({
  details,
  visibleIds
})