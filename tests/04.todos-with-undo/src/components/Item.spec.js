import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import Item from '../../../../main/04.todos-with-undo/src/components/Item'

const setup = propOverrides => {
  const props = Object.assign({
    id: 0,
    text: 'Use redux',
    completed: false,
    onClick: jest.fn()
  }, propOverrides)

  const renderer = new ShallowRenderer()

  renderer.render(
    <Item {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('Item', () => {
    it('should render correctly when completed is false', () => {
      const {output, props} = setup()

      expect(output.type).toBe('li')
      expect(output.props.style).toEqual({"color": "#000", "textDecoration": "none"})
      expect(output.props.children).toEqual(props.text)
    })

    it('should render correctly when completed is true', () => {
      const {output, props} = setup({
        completed: true
      })

      expect(output.type).toBe('li')
      expect(output.props.style).toEqual({"color": "#a5a5a5", "textDecoration": "line-through"})
      expect(output.props.children).toEqual(props.text)
    })

    it('should call onClick on click', () => {
      const {output, props} = setup()

      output.props.onClick({
        preventDefault: jest.fn()
      })
      expect(props.onClick).toBeCalledWith(props.id)
    })
  })
})