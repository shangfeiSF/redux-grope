import React from 'react'
import {mount} from 'enzyme'
import ShallowRenderer from 'react-test-renderer/shallow'

import Themes from '../../../../main/08.async/src/constants/Themes'
import Refresh from '../../../../main/08.async/src/components/Refresh'

const setup = propOverrides => {
  const props = Object.assign({
    selected: Themes[0],

    lastUpdated: '2016-12-05T12:34:56.789Z',

    isFetching: false,

    asyncActions: {
      fetchIfNeed: jest.fn()
    },

    syncActions: {
      select: jest.fn(),
      add: jest.fn(),
      request: jest.fn(),
      receive: jest.fn(),
      refresh: jest.fn()
    },
  }, propOverrides)

  const renderer = new ShallowRenderer()

  renderer.render(
    <Refresh {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('Refresh component', () => {
  it('should display correctly when `lastUpdated` existed and `isFetching` is false', () => {
    const {output, props} = setup()

    expect(output.type).toBe('p')

    const [span, ,a] = output.props.children

    expect(span.type).toBe('span')
    expect(span.props.children).toEqual([
      'Last updated at ',
      `${new Date(props.lastUpdated).toLocaleTimeString()}`,
      '.'
    ])

    expect(a.type).toBe('a')
    expect(a.props.children).toBe('Refresh')
  })

  it('should display correctly when `lastUpdated` not existed and `isFetching` is true', () => {
    const {output} = setup({
      lastUpdated: '',

      isFetching: true
    })

    expect(output.type).toBe('p')
    expect(output.props.children).toEqual([null, ' ', null])
  })

  it('should call `syncActions.refresh` and `asyncActions.fetchIfNeed` when click the refresh button', () => {
    const {props} = setup()

    const output = mount(<Refresh {...props}></Refresh>)

    output.find('a').simulate('click', {
      preventDefault: jest.fn()
    })

    expect(props.syncActions.refresh).toBeCalledWith(props.selected)
    expect(props.asyncActions.fetchIfNeed).toBeCalledWith(props.selected)
  })
})