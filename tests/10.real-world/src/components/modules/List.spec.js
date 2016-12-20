import React from 'react'
import sinon from 'sinon'
import {mount} from 'enzyme'
import TestUtils from 'react-addons-test-utils'

import List from '../../../../../main/10.real-world/src/components/modules/List'

const setup = propOverrides => {
  const props = Object.assign({
    items: [],
    renderItems: sinon.spy(item => item),
    onLoadMoreClick: jest.fn(),
    loadingLabel: 'This is loadingLabel',

    pageCount: 0,
    isFetching: false,
    nextPageUrl: 'This is nextPageUrl'
  }, propOverrides)

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <List {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('List', () => {
  it('should display `loadingLabel` when items is empty and is fetching', () => {
    const {output, props} = setup({
      items: [],
      isFetching: true
    })

    expect(output.type).toBe('h2')

    const i = output.props.children

    expect(i.type).toBe('i')
    expect(i.props.children).toBe(props.loadingLabel)
  })

  it('should display "Nothing here!" when items is empty and nextPageUrl is null', () => {
    const {output, props} = setup({
      items: [],
      isFetching: false,
      nextPageUrl: null
    })

    expect(output.type).toBe('h1')

    const i = output.props.children

    expect(i.type).toBe('i')
    expect(i.props.children).toBe('Nothing here!')
  })

  it('should display correctly', () => {
    const items = [1, 2, 3, 4, 5]

    const {output, props} = setup({
      items: items,
      pageCount: 3,
      isFetching: false,
      nextPageUrl: 'This is nextPageUrl'
    })

    expect(output.type).toBe('div')
    expect(props.renderItems.callCount).toEqual(items.length)

    const [_array,button] = output.props.children

    expect(_array).toEqual(items)
    expect(button.type).toBe('button')
    expect(button.props.style).toEqual({
      fontSize: '150%'
    })
    expect(button.props.disabled).toEqual(props.isFetching)
    expect(button.props.children).toEqual('Load More')
  })

  it('should load more item when click the button', () => {
    const items = [1, 2, 3, 4, 5]

    const {props} = setup({
      items: items,
      pageCount: 3,
      isFetching: false,
      nextPageUrl: 'This is nextPageUrl'
    })

    const output = mount(<List {...props}></List>)

    output.find('button').simulate('click')

    expect(props.onLoadMoreClick).toBeCalled()
  })
})