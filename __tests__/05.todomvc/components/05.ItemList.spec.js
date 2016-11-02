import React from 'react'
import TestUtils from 'react-addons-test-utils'

import ItemList from '../../../main/05.todomvc/src/components/ItemList'
import Item from '../../../main/05.todomvc/src/components/Item'
import ItemListFilter from '../../../main/05.todomvc/src/components/ItemListFilter'

import {SHOW_ALL, SHOW_COMPLETED} from '../../../main/05.todomvc/src/constants/FilterTypes'

const setup = propOverrides => {
  const props = Object.assign({
    todos: [
      {
        id: 0,
        text: 'Use Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Run the tests',
        completed: true
      }
    ],
    actions: {
      deleteActionCreater: jest.fn(),
      editActionCreater: jest.fn(),
      completeActionCreater: jest.fn(),
      completeAllActionCreater: jest.fn(),
      clearCompletedActionCreater: jest.fn()
    }
  }, propOverrides)

  const renderer = TestUtils.createRenderer()
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
    it('should render', () => {
      const {output} = setup()

      expect(output.type).toBe('section')
      expect(output.props.className).toBe('main')

      const [toggleInput, ul, filterInput] = output.props.children

      expect(toggleInput.props.className).toBe('toggle-all')
      expect(toggleInput.props.type).toBe('checkbox')

      expect(ul.props.className).toBe('todo-list')

      expect(filterInput.type).toBe(ItemListFilter)
    })

    describe('toggle input', () => {
      it('should render', () => {
        const {output} = setup()

        const [toggleInput] = output.props.children

        expect(toggleInput.type).toBe('input')
        expect(toggleInput.props.type).toBe('checkbox')
        expect(toggleInput.props.checked).toBe(false)
      })

      it('should be checked if all todos completed', () => {
        const {output} = setup({
          todos: [
            {
              id: 0,
              text: 'Use Redux',
              completed: true
            },
            {
              id: 1,
              text: 'Run the tests',
              completed: true
            }
          ]
        })

        const [toggleInput] = output.props.children

        expect(toggleInput.props.checked).toBe(true)
      })

      it('should call completeAllActionCreater on change', () => {
        const {output, props} = setup()

        const [toggleInput] = output.props.children

        toggleInput.props.onChange({})
        expect(props.actions.completeAllActionCreater).toBeCalled()
      })
    })

    describe('ul list', () => {
      it('should render', () => {
        const {output, props} = setup()

        const [, list] = output.props.children

        expect(list.type).toBe('ul')
        expect(list.props.children.length).toBe(2)
        list.props.children.forEach((item, i) => {
          expect(item.type).toBe(Item)
          expect(item.props.todo).toBe(props.todos[i])
          expect(item.props.actions).toBe(props.actions)
        })
      })

      it('should filter items', () => {
        const {output, props, renderer} = setup()

        const [, , filterInput] = output.props.children

        filterInput.props.onShow(SHOW_COMPLETED)
        const updated = renderer.getRenderOutput()

        const [, updatedList] = updated.props.children
        expect(updatedList.props.children.length).toBe(1)
        expect(updatedList.props.children[0].props.todo).toBe(props.todos[1])
      })
    })

    describe('list filter', () => {
      it('should render', () => {
        const {output} = setup()

        const [, , filterInput] = output.props.children

        expect(filterInput.type).toBe(ItemListFilter)
        expect(filterInput.props.completedCount).toBe(1)
        expect(filterInput.props.activeCount).toBe(1)
        expect(filterInput.props.selectedFilter).toBe(SHOW_ALL)
      })

      it('onShow should set the filter', () => {
        const {output, renderer} = setup()

        const [, , filterInput] = output.props.children

        filterInput.props.onShow(SHOW_COMPLETED)
        const updated = renderer.getRenderOutput()

        const [, , updatedFilterInput] = updated.props.children

        expect(updatedFilterInput.props.selectedFilter).toBe(SHOW_COMPLETED)
      })

      it('onClearCompleted should call clearCompleted', () => {
        const {output, props} = setup()

        const [, , filterInput] = output.props.children

        filterInput.props.onClearCompleted()
        expect(props.actions.clearCompletedActionCreater).toBeCalled()
      })
    })
  })
})