import React from 'react'
import sinon from 'sinon'
import {mount} from 'enzyme'
import ShallowRenderer from 'react-test-renderer/shallow'

import {browserHistory} from 'react-router'
import Explore from '../../../../../main/10.real-world/src/components/modules/Explore'

const setup = propOverrides => {
  const props = Object.assign({
    inputValue: 'facebook/react',

    errorMessage: null,

    resetErrorMessage: jest.fn()
  }, propOverrides)

  const renderer = new ShallowRenderer()

  renderer.render(
    <Explore {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('Explore', () => {
  it('should display correctly with none error message', () => {
    const {output, props} = setup()

    expect(output.type).toBe('div')

    const [exploreArea] = output.props.children

    expect(exploreArea.type).toBe('div')
    expect(exploreArea.props.className).toBe('exploreArea')

    const [p, input, button] = exploreArea.props.children

    expect(p.type).toBe('p')
    expect(p.props.children).toBe("input a username or a repo full name then click 'Go':")

    expect(input.type).toBe('input')
    expect(input.props.size).toBe('30')
    expect(input.props.defaultValue).toBe(props.inputValue)

    expect(button.type).toBe('button')
    expect(button.props.children).toBe('Go!')
  })

  it('should display correctly with error message', () => {
    const {output, props} = setup({
      errorMessage: 'This is a error message.'
    })

    expect(output.type).toBe('div')

    const [exploreArea,] = output.props.children

    expect(exploreArea.type).toBe('div')
    expect(exploreArea.props.className).toBe('exploreArea')

    const [p, input, button] = exploreArea.props.children

    expect(p.type).toBe('p')
    expect(p.props.children).toBe("input a username or a repo full name then click 'Go':")

    expect(input.type).toBe('input')
    expect(input.props.size).toBe('30')
    expect(input.props.defaultValue).toBe(props.inputValue)

    expect(button.type).toBe('button')
    expect(button.props.children).toBe('Go!')

    const [, errorMessage] = output.props.children

    expect(errorMessage.type).toBe('div')
    expect(errorMessage.props.className).toBe('errorMessage')

    const ep = errorMessage.props.children

    expect(ep.type).toBe('p')
    expect(ep.props.style).toEqual({backgroundColor: '#e99', padding: 10})

    const [b, a] = ep.props.children

    expect(b.props.children).toBe(props.errorMessage)
    expect(a.props.href).toBe('#')
    expect(a.props.children).toBe('(Dismiss)')
  })

  it('should call resetErrorMessage when click the dismiss link in errorMessage', () => {
    const {props} = setup({
      errorMessage: 'This is a error message.'
    })

    const output = mount(<Explore {...props}></Explore>)

    output.find('a').simulate('click', {
      preventDefault: jest.fn()
    })

    expect(props.resetErrorMessage).toBeCalled()
  })

  it('should change the route when keyUp happened with keyCode equals 13 on input', () => {
    const spy = sinon.stub(browserHistory, 'push')

    const {props} = setup()

    const output = mount(<Explore {...props}></Explore>)

    const login = 'tj'

    output.node.refs.input.value = login
    output.find('input').simulate('keyup', {
      keyCode: 13
    })

    expect(spy.calledOnce).toEqual(true)
    expect(spy.firstCall.calledWith(`/${login}`)).toEqual(true)

    browserHistory.push.restore()
  })

  it('should unchange the route when keyUp happened with keyCode not equals 13 on input', () => {
    const spy = sinon.stub(browserHistory, 'push')

    const {props} = setup()

    const output = mount(<Explore {...props}></Explore>)

    const login = 'tj'

    output.node.refs.input.value = login
    output.find('input').simulate('keyup', {
      keyCode: 20
    })

    expect(spy.called).toEqual(false)

    browserHistory.push.restore()
  })

  it('should change the route when click go button', () => {
    const spy = sinon.stub(browserHistory, 'push')

    const {props} = setup()

    const output = mount(<Explore {...props}></Explore>)

    const login = 'tj'

    output.node.refs.input.value = login
    output.find('button').simulate('click')

    expect(spy.calledOnce).toEqual(true)
    expect(spy.firstCall.calledWith(`/${login}`)).toEqual(true)

    browserHistory.push.restore()
  })
})