import React from 'react'
import {mount} from 'enzyme'
import ShallowRenderer from 'react-test-renderer/shallow'

import Add from '../../../../main/11.todos-flow/src/components/Add'

const setup = () => {
  const props = {
    onSubmit: jest.fn()
  }

  const renderer = new ShallowRenderer()

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

      expect(button.type).toBe('button')
      expect(button.props.type).toBe('submit')
      expect(button.props.children).toBe('Add')
    })

    it('should call onSubmit when submit the form if the length of text inputed greater than 0', () => {
      const {props} = setup()

      const output = mount(<Add {...props}></Add>)

      output.node.refs.addInput.value = 'Test to add a todo'

      output.find('form').simulate('submit', {
        preventDefault: jest.fn()
      })

      expect(props.onSubmit).toBeCalledWith('Test to add a todo')
      expect(output.node.refs.addInput.value).toBe('')
    })
  })
})