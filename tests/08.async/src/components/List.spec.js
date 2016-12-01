import React from 'react'
import TestUtils from 'react-addons-test-utils'

const mockData = {
  selected: 'Facebook',

  contexts: [
    {
      title: "Facebook will also cut off fake news sites from ad money"
    },
    {
      title: "Facebook's Messenger Rooms in Testing, Lets You Chat With Strangers on a Topic"
    },
    {
      title: "Facebook Says It Found More Miscalculated Metrics"
    }
  ],
}

import List from '../../../../main/08.async/src/components/List'

const setup = propOverrides => {
  const props = Object.assign({
    selected: mockData.selected,

    isFetching: false,

    contexts: mockData.contexts
  }, propOverrides)

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <List {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer,

    contextsMarked: mockData.contexts.map((context, index) => {
      return context.title.split(props.selected).map(part =>
        part.length ? part : (<strong key={`${index}-0`} style={{backgroundColor: 'yellow'}}>{props.selected}</strong>)
      )
    })
  }
}

describe('List component', () => {
  it('should display correctly when `isFetching` is false and `contexts` is not empty', () => {
    const {output, props, contextsMarked} = setup()

    expect(output.type).toBe('div')
    expect(output.props.style).toEqual({
      opacity: 1
    })

    const ul = output.props.children

    expect(ul.type).toBe('ul')
    expect(ul.props.children.length).toBe(props.contexts.length)

    ul.props.children.forEach((node, index) => {
      expect(node.type).toBe('li')
      expect(node.props.style).toEqual({
        fontSize: 20
      })
      expect(node.props.children).toEqual(contextsMarked[index])
    })
  })

  it('should display correctly when `isFetching` is false and `contexts` is empty', () => {
    const {output} = setup({
      contexts: []
    })

    expect(output.type).toBe('h2')
    expect(output.props.children).toBe('Empty.')
  })

  it('should display correctly when `isFetching` is true  and `contexts` is not empty', () => {
    const {output, props, contextsMarked} = setup({
      isFetching: true
    })

    expect(output.type).toBe('div')
    expect(output.props.style).toEqual({
      opacity: 0.3
    })

    const ul = output.props.children

    expect(ul.type).toBe('ul')
    expect(ul.props.children.length).toBe(props.contexts.length)

    ul.props.children.forEach((node, index) => {
      expect(node.type).toBe('li')
      expect(node.props.style).toEqual({
        fontSize: 20
      })
      expect(node.props.children).toEqual(contextsMarked[index])
    })
  })

  it('should display correctly when `isFetching` is true  and `contexts` is empty', () => {
    const {output} = setup({
      isFetching: true,
      contexts: []
    })

    expect(output.type).toBe('h2')
    expect(output.props.children).toBe('Loading...')
  })
})