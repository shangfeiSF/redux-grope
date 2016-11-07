import React from 'react'
import TestUtils from 'react-addons-test-utils'

import Add from '../../../../main/04.todos-with-undo/src/components/Add'

const setup = () => {
  const props = {
    onSubmit: jest.fn()
  }

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <Add {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('Add', () => {
    it('should render correctly', () => {
      const {output} = setup()
      expect(output.type).toBe('div')

      const form = output.props.children
      expect(form.type).toBe('form')

      const [input, button] = form.props.children

      expect(input.type).toBe('input')
      expect(input.ref).toBe('addInput')

      expect(button.type).toBe('button')
      expect(button.props.type).toBe('submit')
      expect(button.props.children).toBe('Add')
    })

    it('should call onSubmit when click button if the length of text inputed in input greater than 0', () => {
      // TODO: need to simulate input onchange
    })
  })
})