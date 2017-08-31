import React from 'react'
import {mount} from 'enzyme'
import ShallowRenderer from 'react-test-renderer/shallow'

import Counter from '../../../../../main/09.universal/src/client/components/Counter'

const setup = propOverrides => {
  const props = Object.assign({
    counter: 10,

    syncActions: {
      increase: jest.fn(),
      decrease: jest.fn()
    },

    thunkActions: {
      increaseIfOdd: jest.fn(),
      increameAsync: jest.fn()
    },
  }, propOverrides)

  const renderer = new ShallowRenderer()

  renderer.render(
    <Counter {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('Counter component', () => {
  it('should display correctly', () => {
    const {output, props} = setup()

    expect(output.type).toBe('div')

    const [h2, syncArea, asyncArea] = output.props.children

    expect(h2.type).toBe('h2')
    expect(h2.props.children).toEqual([
      'Clicked: ',
      props.counter,
      ' times'
    ])

    expect(syncArea.type).toBe('div')
    const [syncArea_p1, syncArea_p2] = syncArea.props.children

    expect(syncArea_p1.type).toBe('p')
    expect(syncArea_p2.type).toBe('p')
    expect(syncArea_p1.props.children.type).toBe('button')
    expect(syncArea_p1.props.children.props.children).toBe('Increase')
    expect(syncArea_p2.props.children.type).toBe('button')
    expect(syncArea_p2.props.children.props.children).toBe('Decrease')

    expect(asyncArea.type).toBe('div')
    const [asyncArea_p1, asyncArea_p2] = asyncArea.props.children

    expect(asyncArea_p1.type).toBe('p')
    expect(asyncArea_p2.type).toBe('p')
    expect(asyncArea_p1.props.children.type).toBe('button')
    expect(asyncArea_p1.props.children.props.children).toBe('Increase if odd')
    expect(asyncArea_p2.props.children.type).toBe('button')
    expect(asyncArea_p2.props.children.props.children).toBe('Increase async')
  })

  it('should call `syncActions.increase` when click the `Increase` button', () => {
    const {props} = setup()

    const output = mount(<Counter {...props}></Counter>)

    output.find('button').at(0).simulate('click', {
      preventDefault: jest.fn()
    })


    expect(props.syncActions.increase).toBeCalled()
  })

  it('should call `syncActions.decrease` when click the `Decrease` button', () => {
    const {props} = setup()

    const output = mount(<Counter {...props}></Counter>)

    output.find('button').at(1).simulate('click', {
      preventDefault: jest.fn()
    })

    expect(props.syncActions.decrease).toBeCalled()
  })

  it('should call `syncActions.increaseIfOdd` when click the `Increase if odd` button', () => {
    const {props} = setup()

    const output = mount(<Counter {...props}></Counter>)

    output.find('button').at(2).simulate('click', {
      preventDefault: jest.fn()
    })

    expect(props.thunkActions.increaseIfOdd).toBeCalled()
  })

  it('should call `syncActions.increameAsync` when click the `Increase async` button', () => {
    const {props} = setup()

    const output = mount(<Counter {...props}></Counter>)

    output.find('button').at(3).simulate('click', {
      preventDefault: jest.fn()
    })

    expect(props.thunkActions.increameAsync).toBeCalled()
  })
})