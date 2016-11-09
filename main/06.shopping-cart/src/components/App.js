import React, {Component, PropTypes} from 'react'

import ProductsList from './ProductsList'
import Cart from './Cart'

class App extends Component {
  static propTypes = {
    shoppingList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
      })
    ).isRequired,

    total: PropTypes.string,

    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired
      })
    ).isRequired,

    checkout: PropTypes.func.isRequired,

    addToCart: PropTypes.func.isRequired
  }

  render() {
    let {shoppingList, products, total, checkout, addToCart} = this.props

    return (
      <div>
        <ProductsList products={products} addToCart={addToCart}/>
        <Cart shoppingList={shoppingList} total={total} checkout={checkout}/>
      </div>
    )
  }
}

export default App