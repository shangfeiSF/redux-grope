import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import Cart from '../../../../main/06.shopping-cart/src/components/Cart'
import ProductInfo from '../../../../main/06.shopping-cart/src/components/ProductInfo'

const setup = propOverrides => {
  const props = Object.assign({
    shoppingList: [
      {
        id: 1,
        title: 'Product 1',
        price: 10.46,
        quantity: 2,
        inventory: 0
      },
      {
        id: 2,
        title: 'Product 2',
        price: 15.00,
        quantity: 5,
        inventory: 0
      }
    ],

    total: '95.92',

    checkout: jest.fn()
  }, propOverrides)

  const renderer = new ShallowRenderer()

  renderer.render(
    <Cart {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('Cart component', () => {
  it('should display correctly when shoppingList is not empty', () => {
    const {output, props} = setup()

    expect(output.type).toBe('div')

    const [h1, ul, p, button] = output.props.children

    expect(h1.type).toBe('h1')
    expect(h1.props.children).toBe('Your Cart')

    expect(ul.type).toBe('ul')
    expect(ul.props.children.length).toBe(props.shoppingList.length)
    ul.props.children.forEach((node, index) => {
      expect(node.type).toBe(ProductInfo)
      expect(node.props.product).toBe(props.shoppingList[index])
    })

    expect(p.type).toBe('p')
    expect(p.props.children).toEqual(['Total: $', props.total])

    expect(button.type).toBe('button')
    expect(button.props.disabled).toBe('')
    expect(button.props.children).toBe('Checkout')
  })

  it('should disable Checkout-button and show tips when shoppingList is empty', () => {
    const {output} = setup({
      shoppingList: []
    })

    const [, ul, , button] = output.props.children

    expect(ul.props.children.type).toBe('em')
    expect(ul.props.children.props.children).toBe('Please add some products to cart.')

    expect(button.props.disabled).toBe('disabled')
  })

  it('should call checkout on Checkout-button click', () => {
    const {output, props} = setup()

    const [, , , button] = output.props.children

    expect(button.props.disabled).toBe('')

    button.props.onClick()
    expect(props.checkout).toBeCalledWith(props.shoppingList)
  })
})