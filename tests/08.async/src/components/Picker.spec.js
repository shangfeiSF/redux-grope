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

  it('should call `syncActions.select` when change the selected theme', () => {
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

  it('should call `syncActions.select` when click the fetch button with a new theme', () => {
    const {props} = setup()
    const new_theme = 'test theme'

    const output = mount(<Picker {...props}></Picker>)

    Object.keys(output.node.refs).forEach(key => {
      output.node.refs[key].value = new_theme
    })

    output.find('button').simulate('click', {
      preventDefault: jest.fn()
    })

    expect(props.syncActions.select).toBeCalledWith(new_theme)
  })

  it('should not call `syncActions.select` when click the fetch button with a unchanged theme', () => {
    const {props} = setup()
    const unchanged_theme = Themes[0]

    const output = mount(<Picker {...props}></Picker>)

    Object.keys(output.node.refs).forEach(key => {
      output.node.refs[key].value = unchanged_theme
    })

    output.find('button').simulate('click', {
      preventDefault: jest.fn()
    })

    expect(props.syncActions.select).not.toBeCalled()
  })

  it('should not call `syncActions.select` when click the fetch button with a empty theme', () => {
    const {props} = setup()
    const empty_theme = ''

    const output = mount(<Picker {...props}></Picker>)

    Object.keys(output.node.refs).forEach(key => {
      output.node.refs[key].value = empty_theme
    })

    output.find('button').simulate('click', {
      preventDefault: jest.fn()
    })

    expect(props.syncActions.select).not.toBeCalled()
  })

  it('should call both `syncActions.add` and `asyncActions.fetchIfNeed` in `componentWillReceiveProps` with a `unadded & changed` theme', () => {
    const unadded_changed_theme = 'test theme'

    const spy = sinon.stub(Picker.prototype, 'componentWillReceiveProps', nextProps => {
      const {themes, selected, asyncActions, syncActions} = nextProps

      if (nextProps.selected !== props.selected) {
        if (themes.indexOf(selected) < 0) {
          syncActions.add(selected)
        }

        asyncActions.fetchIfNeed(selected)
      }
    })

    const {props} = setup()
    const output = mount(<Picker {...props}></Picker>)
    expect(spy.calledOnce).toEqual(false)

    const {props: nextProps} = setup({
      selected: unadded_changed_theme
    })
    output.setProps(nextProps)
    expect(spy.calledOnce).toEqual(true)

    expect(nextProps.syncActions.add).toBeCalledWith(unadded_changed_theme) // unadded theme should be added
    expect(nextProps.asyncActions.fetchIfNeed).toBeCalledWith(unadded_changed_theme)  // changed theme should be fetched if necessary

    Picker.prototype.componentWillReceiveProps.restore()
  })

  it('should only call `asyncActions.fetchIfNeed` in `componentWillReceiveProps` with a `added & changed ` theme', () => {
    const added_and_changed = Themes[1]

    const spy = sinon.stub(Picker.prototype, 'componentWillReceiveProps', nextProps => {
      const {themes, selected, asyncActions, syncActions} = nextProps

      if (nextProps.selected !== props.selected) {
        if (themes.indexOf(selected) < 0) {
          syncActions.add(selected)
        }

        asyncActions.fetchIfNeed(selected)
      }
    })

    const {props} = setup()
    const output = mount(<Picker {...props}></Picker>)
    expect(spy.calledOnce).toEqual(false)

    const {props: nextProps} = setup({
      selected: added_and_changed
    })
    output.setProps(nextProps)
    expect(spy.calledOnce).toEqual(true)

    expect(nextProps.syncActions.add).not.toBeCalled() // added theme should not be added
    expect(nextProps.asyncActions.fetchIfNeed).toBeCalledWith(added_and_changed) // changed theme should be fetched if necessary

    Picker.prototype.componentWillReceiveProps.restore()
  })

  it('should not call both `syncActions.add` and `asyncActions.fetchIfNeed`  in `componentWillReceiveProps` with a `unchanged` theme', () => {
    const spy = sinon.stub(Picker.prototype, 'componentWillReceiveProps', nextProps => {
      const {themes, selected, asyncActions, syncActions} = nextProps

      if (nextProps.selected !== props.selected) {
        if (themes.indexOf(selected) < 0) {
          syncActions.add(selected)
        }

        asyncActions.fetchIfNeed(selected)
      }
    })

    const {props} = setup()
    const output = mount(<Picker {...props}></Picker>)
    expect(spy.calledOnce).toEqual(false)

    const {props: nextProps} = setup()
    output.setProps(nextProps)
    expect(spy.calledOnce).toEqual(true)

    expect(nextProps.syncActions.add).not.toBeCalled()  // unchanged theme must be already added
    expect(nextProps.asyncActions.fetchIfNeed).not.toBeCalled() // unchanged theme should not be fetched in any case

    Picker.prototype.componentWillReceiveProps.restore()
  })
})