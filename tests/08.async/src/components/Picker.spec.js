import React from 'react'
import {mount} from 'enzyme'
import TestUtils from 'react-addons-test-utils'
import sinon from 'sinon'

import Themes from '../../../../main/08.async/src/constants/Themes'
import Picker from '../../../../main/08.async/src/components/Picker'

const setup = propOverrides => {
  const props = Object.assign({
    themes: Themes,

    selected: Themes[0],

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

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <Picker {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('Picker component', () => {
  it('should display correctly', () => {
    const {output, props} = setup()

    expect(output.type).toBe('div')

    const [h1, select, p] = output.props.children

    expect(h1.type).toBe('h1')
    expect(h1.props.children).toBe(props.selected)

    expect(select.type).toBe('select')
    expect(select.props.children.length).toBe(props.themes.length)
    select.props.children.forEach((node, index) => {
      expect(node.type).toBe('option')
      expect(node.props.value).toEqual(props.themes[index])
      expect(node.props.children).toEqual(props.themes[index])
    })

    expect(p.type).toBe('p')
    const [input, button] = p.props.children

    expect(input.type).toBe('input')
    expect(button.type).toBe('button')
    expect(button.props.style).toEqual({
      marginLeft: 10
    })
    expect(button.props.children).toBe('Fetch')
  })

  it('should call syncActions.select when change the selected theme', () => {
    const {props} = setup()

    const output = mount(<Picker {...props}></Picker>)

    Object.keys(output.node.refs).forEach(key => {
      output.node.refs[key].value = 'foo'
    })

    output.find('select').simulate('change', {
      target: {
        value: Themes[1]
      }
    })

    Object.keys(output.node.refs).forEach(key => {
      expect(output.node.refs[key].value).toBe('')
    })
    expect(props.syncActions.select).toBeCalledWith(Themes[1])
  })

  it('should call syncActions.select when click the fetch button', () => {
    const {props} = setup()
    const theme = 'test theme'

    const output = mount(<Picker {...props}></Picker>)

    Object.keys(output.node.refs).forEach(key => {
      output.node.refs[key].value = theme
    })

    output.find('button').simulate('click', {
      preventDefault: jest.fn()
    })

    expect(props.syncActions.select).toBeCalledWith(theme)
  })

  it('should call syncActions.add and asyncActions.fetchIfNeed when receive new props with a new selected', () => {
    const theme = 'test theme'
    const spy = sinon.spy(Picker.prototype, 'componentWillReceiveProps')

    const {props} = setup()

    const output = mount(<Picker {...props}></Picker>)
    expect(spy.calledOnce).toEqual(false)

    const {props: nextProps} = setup({
      selected: theme
    })
    output.setProps(nextProps)
    expect(spy.calledOnce).toEqual(true)

    expect(props.syncActions.add).toBeCalledWith(theme)
    expect(props.asyncActions.fetchIfNeed).toBeCalledWith(theme)
  })
})