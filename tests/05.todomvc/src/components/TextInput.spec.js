import React from 'react'

import TestUtils from 'react-addons-test-utils'
import TodoTextInput from '../../../../main/05.todomvc/src/components/TextInput'

const setup = propOverrides => {
  const props = Object.assign({
    model: 'add',
    onSave: jest.fn(),
    placeholder: 'What needs to be done?',
    text: 'Use Redux'
  }, propOverrides)

  const renderer = TestUtils.createRenderer()

  renderer.render(
    <TodoTextInput {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('TextInput', () => {
    it('should render correctly when as an add input', () => {
      const {output} = setup()

      expect(output.props.placeholder).toEqual('What needs to be done?')
      expect(output.props.value).toEqual('Use Redux')
      expect(output.props.className).toEqual('new-todo')
    })

    it('should render correctly when as an edit input', () => {
      const {output} = setup({
        model: 'edit'
      })

      expect(output.props.className).toEqual('edit')
    })

    it('should update value on change', () => {
      const {output, renderer} = setup()

      output.props.onChange({
        target: {
          value: 'Do tests'
        }
      })
      const updated = renderer.getRenderOutput()

      expect(updated.props.value).toEqual('Do tests')
    })

    it('should call onSave on return key press', () => {
      const {output, props} = setup()

      output.props.onKeyDown({
        which: 13,
        target: {
          value: 'Do tests'
        }
      })
      expect(props.onSave).toBeCalledWith('Do tests')
    })

    it('should reset state on return key press if as an add input', () => {
      const {output, renderer} = setup()

      output.props.onKeyDown({
        which: 13,
        target: {
          value: 'Do tests'
        }
      })
      const updated = renderer.getRenderOutput()

      expect(updated.props.value).toEqual('')
    })

    it('should call onSave on blur when as an edit input', () => {
      const {output, props} = setup({
        model: 'edit'
      })

      output.props.onBlur({
        target: {
          value: 'Do tests'
        }
      })
      expect(props.onSave).toBeCalledWith('Do tests')
    })

    it('should not call onSave on blur when as an add input', () => {
      const {output, props} = setup()

      output.props.onBlur({
        target: {
          value: 'Do tests'
        }
      })
      expect(props.onSave).not.toBeCalled()
    })
  })
})