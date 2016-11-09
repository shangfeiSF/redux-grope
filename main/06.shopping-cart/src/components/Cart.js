import React, {Component, PropTypes} from 'react'
import ProductInfo from './ProductInfo'

class Cart extends Component {
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

    checkout: PropTypes.func.isRequired
  }

  handlerOnClick = () => {
    let {products, checkout} = this.props
    checkout(products)
  }

  render() {
    let {shoppingList, total} = this.props

    const list = shoppingList.length > 0 ?
      ( shoppingList.map(product => <ProductInfo key={product.id} product={product}/>) ) :
      ( <em>Please add some products to cart.</em> )

    return (
      <div>
        <h1>Your Cart</h1>
        <ul>{list}</ul>

        <p>Total: &#36;{total}</p>

        <button onClick={this.handlerOnClick} disabled={shoppingList.length > 0 ? '' : 'disabled'}>Checkout</button>
      </div>
    )
  }
}

export default Cart