import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import ProductItem from '../../../../main/06.shopping-cart/src/components/ProductItem'
import ProductInfo from '../../../../main/06.shopping-cart/src/components/ProductInfo'

const setup = propOverrides => {
  const props = Object.assign({
    product: {
      id: 1,
      title: 'Product 1',
      price: 10.46,
      inventory: 2
    },

    addToCart: jest.fn()
  }, propOverrides)

  const renderer = new ShallowRenderer()

  renderer.render(
    <ProductItem {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('ProductItem component', () => {
  describe('when product inventory greater than 0', () => {
    it('should render product', () => {
      const {output, props} = setup()

      expect(output.type).toBe('ul')
      expect(output.props.style).toEqual({'marginBottom': 10})

      const [info, button] = output.props.children

      expect(info.type).toBe(ProductInfo)
      expect(info.props.product).toBe(props.product)

      expect(button.type).toBe('button')
      expect(button.props.disabled).toBe('')
      expect(button.props.children).toBe('Add to cart now')
    })

    it('should call addToCart on button click', () => {
      const {output, props} = setup()

      const [, button] = output.props.children

      expect(button.props.disabled).toBe('')

      button.props.onClick()
      expect(props.addToCart).toBeCalledWith(props.product.id)
    })
  })

  describe('when product inventory is 0', () => {
    it('should render Sold Out message and button disabled', () => {
      const {output} = setup({
        product: {
          id: 1,
          title: 'Product 1',
          price: 10.46,
          inventory: 0
        }
      })

      const [, button] = output.props.children

      expect(button.props.disabled).toBe('disabled')
      expect(button.props.children).toBe('Sold Out')
    })
  })
})