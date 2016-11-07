import React from 'react'
import TestUtils from 'react-addons-test-utils'

import UndoRedo from '../../../../main/04.todos-with-undo/src/components/UndoRedo'

const setup = propOverrides => {
  const props = Object.assign({
    canUndo: false,
    canRedo: false,
    onUndo: jest.fn(),
    onRedo: jest.fn()
  }, propOverrides)

  const renderer = TestUtils.createRenderer()

  renderer.render(
    <UndoRedo {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('UndoRedo', () => {
    it('should render correctly', () => {
      const {output} = setup()
      const [buttonUndo, buttonRedo] =  output.props.children

      expect(output.type).toBe('p')

      expect(buttonUndo.type).toBe('button')
      expect(buttonRedo.type).toBe('button')

      expect(buttonUndo.props.disabled).toBe(true)
      expect(buttonRedo.props.disabled).toBe(true)

      expect(buttonUndo.props.children).toBe('Undo')
      expect(buttonRedo.props.children).toBe('Redo')
    })

    it('should call correctly when canUndo is true', () => {
      const {output, props} = setup({
        canUndo: true,
      })
      const [buttonUndo] =  output.props.children

      expect(buttonUndo.props.disabled).toBe(false)

      buttonUndo.props.onClick()
      expect(props.onUndo).toBeCalled()
    })

    it('should call correctly when canUndo is false', () => {
      const {output, props} = setup()
      const [buttonUndo] =  output.props.children

      expect(buttonUndo.props.disabled).toBe(true)

      buttonUndo.props.onClick()
      expect(props.onUndo).not.toBeCalled()
    })

    it('should call correctly when canRedo is true', () => {
      const {output, props} = setup({
        canRedo: true,
      })
      const [, buttonRedo] =  output.props.children

      expect(buttonRedo.props.disabled).toBe(false)

      buttonRedo.props.onClick()
      expect(props.onRedo).toBeCalled()
    })

    it('should call correctly when canRedo is false', () => {
      const {output, props} = setup()
      const [, buttonRedo] =  output.props.children

      expect(buttonRedo.props.disabled).toBe(true)

      buttonRedo.props.onClick()
      expect(props.onRedo).not.toBeCalled()
    })
  })
})