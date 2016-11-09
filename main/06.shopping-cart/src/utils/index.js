const HELPERS = {
  quantity: (cart, id) => cart.quantityById[id] || 0,

  details: (products, id) => products.details[id]
}

const utils = {
  total: state => state.cart.addedIds.reduce(
    (sum, id) => sum + HELPERS.details(state.products, id).price * HELPERS.quantity(state.cart, id),
    0
  ).toFixed(2),

  shoppingList: state => state.cart.addedIds.map(
    id => ({
      ...HELPERS.details(state.products, id),
      quantity: HELPERS.quantity(state.cart, id)
    })
  ),

  products: state => state.products.visibleIds.map(
    id => HELPERS.details(state.products, id)
  )
}

export default utils