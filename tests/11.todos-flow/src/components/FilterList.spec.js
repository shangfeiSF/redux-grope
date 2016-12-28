import React from 'react'
import TestUtils from 'react-addons-test-utils'

import FilterList from '../../../../main/11.todos-flow/src/components/FilterList'
import FilterContainer from '../../../../main/11.todos-flow/src/containers/FilterContainer'

const setup = () => {
  const renderer = TestUtils.createRenderer()

  renderer.render(
    <FilterList />
  )

  const output = renderer.getRenderOutput()

  return {
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('FilterList', () => {
    it('should render correctly', () => {
      const {output} = setup()

      const [h3, ul] = output.props.children

      expect(output.type).toBe('div')
      expect(h3.type).toBe('h3')
      expect(ul.type).toBe('ul')

      expect(h3.props.children).toBe('FilterList')

      const [all, active, completed] = ul.props.children

      expect(all.type).toBe('li')
      expect(all.props.className).toBe('all')

      expect(active.type).toBe('li')
      expect(active.props.className).toBe('active')

      expect(completed.type).toBe('li')
      expect(completed.props.className).toBe('completed')

      const FilterContainers = [
        all.props.children,
        active.props.children,
        completed.props.children,
      ]

      const map = [{
        filter: 'ALL',
        text: 'All'
      }, {
        filter: 'ACTIVE',
        text: 'Active'
      }, {
        filter: 'COMPLETED',
        text: 'Completed'
      }]

      FilterContainers.forEach(function (container, index) {
        expect(container.type).toBe(FilterContainer)
        expect(container.props.filter).toBe(map[index].filter)
        expect(container.props.children).toBe(map[index].text)
      })
    })
  })
})