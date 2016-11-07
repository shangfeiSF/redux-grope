import React from 'react'
import TestUtils from 'react-addons-test-utils'

import Filter from '../../../../main/04.todos-with-undo/src/components/Filter'

const setup = propOverrides => {
  const props = Object.assign({
    active: true,
    children: 'ALL',
    onClick: jest.fn()
  }, propOverrides)

  const renderer = TestUtils.createRenderer()

  renderer.render(
    <Filter {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('Filter', () => {
    it('should render correctly when active is true', () => {
      const {output} = setup()

      expect(output.type).toBe('span')
      expect(output.props.children).toEqual('ALL')
    })

    it('should render correctly when active is false', () => {
      const {output} = setup({
        active: false
      })

      expect(output.type).toBe('a')
      expect(output.props.href).toBe('#')
    })

    it('should call onClick on click when active is false', () => {
      const {output, props} = setup({
        active: false
      })

      output.props.onClick({
        preventDefault: jest.fn()
      })
      expect(props.onClick).toBeCalled()
    })
  })
})