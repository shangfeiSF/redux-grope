import React from 'react'
import TestUtils from 'react-addons-test-utils'

import Item from '../../../../main/05.todomvc/src/components/Item'
import TextInput from '../../../../main/05.todomvc/src/components/TextInput'

const setup = (editing = false) => {
  const props = {
    todo: {
      id: 0,
      text: 'Use Redux',
      completed: false
    },
    actions: {
      editActionCreater: jest.fn(),
      deleteActionCreater: jest.fn(),
      completeActionCreater: jest.fn()
    }
  }

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <Item {...props} />
  )

  let output = renderer.getRenderOutput()

  if (editing) {
    const label = output.props.children.props.children[1]
    label.props.onDoubleClick({})

    output = renderer.getRenderOutput()
  }

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('Item', () => {
    it('initial render', () => {
      const {output} = setup()

      expect(output.type).toBe('li')
      expect(output.props.className).toBe('')

      const div = output.props.children

      expect(div.type).toBe('div')
      expect(div.props.className).toBe('view')

      const [input, label, button] = div.props.children

      expect(input.type).toBe('input')
      expect(input.props.checked).toBe(false)

      expect(label.type).toBe('label')
      expect(label.props.children).toBe('Use Redux')

      expect(button.type).toBe('button')
      expect(button.props.className).toBe('destroy')
    })

    it('input onChange should call completeTodo', () => {
      const {output, props} = setup()

      const input = output.props.children.props.children[0]

      input.props.onChange({})
      expect(props.actions.completeActionCreater).toBeCalledWith(0)
    })

    it('button onClick should call deleteTodo', () => {
      const {output, props} = setup()

      const button = output.props.children.props.children[2]

      button.props.onClick({})
      expect(props.actions.deleteActionCreater).toBeCalledWith(0)
    })

    it('label onDoubleClick should put component in edit state', () => {
      const {output, renderer} = setup()

      const label = output.props.children.props.children[1]
      label.props.onDoubleClick({})

      const updated = renderer.getRenderOutput()

      expect(updated.type).toBe('li')
      expect(updated.props.className).toBe('editing')
    })

    it('edit state render', () => {
      const {output} = setup(true)

      expect(output.type).toBe('li')
      expect(output.props.className).toBe('editing')

      const input = output.props.children

      expect(input.type).toBe(TextInput)
      expect(input.props.text).toBe('Use Redux')
      expect(input.props.model).toBe('edit')
    })

    it('TextInput onSave should call editTodo', () => {
      const {output, props} = setup(true)

      output.props.children.props.onSave('Use Redux')

      expect(props.actions.editActionCreater).toBeCalledWith(0, 'Use Redux')
    })

    it('TextInput onSave should call deleteTodo if text is empty', () => {
      const {output, props} = setup(true)

      output.props.children.props.onSave('')

      expect(props.actions.deleteActionCreater).toBeCalledWith(0)
    })

    it('TextInput onSave should exit component from edit state', () => {
      const {output, renderer} = setup(true)

      output.props.children.props.onSave('Use Redux')

      const updated = renderer.getRenderOutput()

      expect(updated.type).toBe('li')
      expect(updated.props.className).toBe('')
    })
  })
})