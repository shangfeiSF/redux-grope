import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import Item from '../../../../main/03.todos/src/components/Item'
import ItemList from '../../../../main/03.todos/src/components/ItemList'

const setup = propOverrides => {
  const props = Object.assign({
    items: [{
      id: 0,
      text: 'Use redux',
      completed: false,
    }, {
      id: 1,
      text: 'Do test',
      completed: true,
    }, {
      id: 2,
      text: 'jest',
      completed: false,
    }],
    onItemClick: jest.fn()
  }, propOverrides)


  const renderer = new ShallowRenderer()

  renderer.render(
    <ItemList {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('ItemList', () => {
    it('should render correctly', () => {
      const {output, props} = setup()
      const [h3, ul] = output.props.children

      expect(output.type).toBe('div')

      expect(h3.type).toBe('h3')
      expect(h3.props.children).toBe('ItemsList')

      expect(ul.type).toBe('ul')

      ul.props.children.forEach(function (item, index) {
        expect(item.type).toBe(Item)

        var data = props.items[index]

        expect(item.props.id).toBe(data.id)
        expect(item.props.completed).toBe(data.completed)
        expect(item.props.text).toBe(data.text)
      })
    })
  })
})