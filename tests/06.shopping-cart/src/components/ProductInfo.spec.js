import React from 'react'
import TestUtils from 'react-addons-test-utils'

import ProductInfo from '../../../../main/06.shopping-cart/src/components/ProductInfo'

const setup = propOverrides => {
  const props = Object.assign({
    product: {
      id: 1,
      title: 'Product 1',
      price: 10.46,
      inventory: 2,
      quantity: 1
    },
  }, propOverrides)

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <ProductInfo {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('ProductInfo component', () => {
  it('should render product', () => {
    const {output, props} = setup()

    expect(output.type).toBe('li')
    expect(output.props.style).toEqual({
      fontSize: 20,
      marginBottom: 10
    })

    expect(output.props.children).toEqual([
      props.product.title,
      ' - $',
      props.product.price,
      ` x ${props.product.quantity}`
    ])

  })
})
