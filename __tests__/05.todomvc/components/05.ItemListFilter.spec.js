import React from 'react'
import TestUtils from 'react-addons-test-utils'

import ItemListFilter from '../../../main/05.todomvc/src/components/ItemListFilter'

import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../../../main/05.todomvc/src/constants/FilterTypes'

const setup = propOverrides => {
  const props = Object.assign({
    completedCount: 0,
    activeCount: 0,
    selectedFilter: SHOW_ALL,
    onClearCompleted: jest.fn(),
    onShow: jest.fn()
  }, propOverrides)

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <ItemListFilter {...props} />
  )
  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output
  }
}

const getTextContent = elem => {
  const children = Array.isArray(elem.props.children) ? elem.props.children : [elem.props.children]
  return children.reduce((out, child) => out + (child.props ? getTextContent(child) : child), '')
}

describe('components', () => {
  describe('ItemListFilter', () => {
    it('should render', () => {
      const {output} = setup()

      expect(output.type).toBe('footer')
      expect(output.props.className).toBe('footer')
    })

    it('should display active count when 0', () => {
      const {output} = setup({
        activeCount: 0
      })

      const [count] = output.props.children
      expect(getTextContent(count)).toBe('No items left')
    })

    it('should display active count when above 0', () => {
      const {output} = setup({
        activeCount: 1
      })

      const [count] = output.props.children
      expect(getTextContent(count)).toBe('1 item left')
    })

    it('should render filterLinks', () => {
      const {output} = setup()

      const [, filterLinks] = output.props.children

      expect(filterLinks.type).toBe('ul')
      expect(filterLinks.props.className).toBe('filters')
      expect(filterLinks.props.children.length).toBe(3)

      filterLinks.props.children.forEach(function (filterLink, i) {
        expect(filterLink.type).toBe('li')

        const a = filterLink.props.children

        expect(a.props.className).toBe(i === 0 ? 'selected' : '')
        expect(a.props.children).toBe({
          0: 'All',
          1: 'Active',
          2: 'Completed'
        }[i])
      })
    })

    it('should call onShow when a filterLink is clicked', () => {
      const {output, props} = setup()
      const [, filterLinks] = output.props.children

      const a = filterLinks.props.children[1].props.children

      a.props.onClick({})
      expect(props.onShow).toBeCalledWith(SHOW_ACTIVE)
    })

    it('shouldnt show clear button when no completed todos', () => {
      const {output} = setup({
        completedCount: 0
      })

      const [, , clearButton] = output.props.children
      expect(clearButton).toBe(undefined)
    })

    it('should render clear button when existed completed todos', () => {
      const {output} = setup({
        completedCount: 1
      })

      const [, , clearButton] = output.props.children

      expect(clearButton.type).toBe('button')
      expect(clearButton.props.children).toBe('Clear completed')
    })

    it('should call onClearCompleted on clear button click', () => {
      const {output, props} = setup({
        completedCount: 1
      })

      const [, , clearButton] = output.props.children

      clearButton.props.onClick({})
      expect(props.onClearCompleted).toBeCalled()
    })
  })
})
