import React from 'react'
import TestUtils from 'react-addons-test-utils'

import Header from '../../../../main/05.todomvc/src/components/Header'
import TextInput from '../../../../main/05.todomvc/src/components/TextInput'

const setup = () => {
  const props = {
    add: jest.fn()
  }

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <Header {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const {output} = setup()

      expect(output.type).toBe('header')
      expect(output.props.className).toBe('header')

      const [h1, input] = output.props.children

      expect(h1.type).toBe('h1')
      expect(h1.props.children).toBe('Todos App')

      expect(input.type).toBe(TextInput)
      expect(input.props.model).toBe('add')
      expect(input.props.placeholder).toBe('What needs to be done?')
    })

    it('should call add if length of text is greater than 0', () => {
      const {output, props} = setup()

      const input = output.props.children[1]

      input.props.onSave('')
      expect(props.add).not.toBeCalled()

      input.props.onSave('Use Redux')
      expect(props.add).toBeCalled()
    })
  })
})