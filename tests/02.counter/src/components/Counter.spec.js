import React from 'react'
import {shallow} from 'enzyme'
import Counter from '../../../../main/02.counter/src/components/Counter'

const setup = (value = 0) => {
  const actions = {
    handlerOnIncrease: jest.fn(),
    handlerOnDecrease: jest.fn()
  }
  const component = shallow(<Counter value={value} {...actions} />)

  return {
    component: component,
    actions: actions,
    h3: component.find('h3'),
    buttons: component.find('button')
  }
}

describe('Counter component', () => {
  it('should display count', () => {
    const {h3} = setup()

    expect(h3.text()).toMatch(/^Clicked: 0 times/)
  })

  it('first button should call handlerOnIncrease', () => {
    const {buttons, actions} = setup()

    buttons.at(0).simulate('click')
    expect(actions.handlerOnIncrease).toBeCalled()
  })

  it('second button should call handlerOnDecrease', () => {
    const {buttons, actions} = setup()

    buttons.at(1).simulate('click')
    expect(actions.handlerOnDecrease).toBeCalled()
  })

  it('third button should not call handlerOnIncrease if the counter is even', () => {
    const {buttons, actions} = setup(42)

    buttons.at(2).simulate('click')
    expect(actions.handlerOnIncrease).not.toBeCalled()
  })

  it('third button should call handlerOnIncrease if the counter is odd', () => {
    const {buttons, actions} = setup(43)

    buttons.at(2).simulate('click')
    expect(actions.handlerOnIncrease).toBeCalled()
  })

  it('third button should call handlerOnIncrease if the counter is odd and negative', () => {
    const {buttons, actions} = setup(-43)

    buttons.at(2).simulate('click')
    expect(actions.handlerOnIncrease).toBeCalled()
  })

  it('fourth button should call handlerOnIncrease in a second', (done) => {
    const {buttons, actions} = setup()

    buttons.at(3).simulate('click')
    setTimeout(() => {
      expect(actions.handlerOnIncrease).toBeCalled()
      done()
    }, 1000)
  })
})