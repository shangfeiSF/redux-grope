import React, {Component, PropTypes} from 'react'
import Product from './Product'

class Cart extends Component {
  static propTypes = {
    products: PropTypes.array,
    total: PropTypes.string,
    onCheckoutClicked: PropTypes.func
  }

  render() {
    let {products, total, onCheckoutClicked} = this.props

    const producrsInCart = products.length > 0 ? (
      products.map(product =>
        <Product
          title={product.title}
          price={product.price}
          quantity={product.quantity}
          key={product.id}
        />
      )
    ) : (<em>Please add some products to cart.</em>)

    return (
      <div>
        <h1>Your Cart</h1>
        <ul>{producrsInCart}</ul>

        <p>Total: &#36;{total}</p>

        <button onClick={onCheckoutClicked} disabled={products.length > 0 ? '' : 'disabled'}>Checkout</button>
      </div>
    )
  }
}

export default Cart