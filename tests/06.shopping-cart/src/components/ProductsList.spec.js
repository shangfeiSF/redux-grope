import React from 'react'
import TestUtils from 'react-addons-test-utils'

import ProductsList from '../../../../main/06.shopping-cart/src/components/ProductsList'
import ProductItem from '../../../../main/06.shopping-cart/src/components/ProductItem'

const setup = propOverrides => {
  const props = Object.assign({
    products: [
      {
        id: 1,
        title: 'Product 1',
        price: 10.46,
        inventory: 2
      },
      {
        id: 2,
        title: 'Product 2',
        price: 15.00,
        inventory: 5
      }
    ],

    addToCart: jest.fn()
  }, propOverrides)

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <ProductsList {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('ProductsList component', () => {
  it('should display correctly', () => {
    const {output, props} = setup()

    expect(output.type).toBe('div')

    const [h1, div] = output.props.children

    expect(h1.type).toBe('h1')
    expect(h1.props.children).toBe('Products')

    expect(div.type).toBe('div')
    expect(div.props.children.length).toBe(props.products.length)
    div.props.children.forEach((node, index) => {
      expect(node.type).toBe(ProductItem)
      expect(node.props.product).toBe(props.products[index])
      expect(node.props.addToCart).toBe(props.addToCart)
    })
  })
})