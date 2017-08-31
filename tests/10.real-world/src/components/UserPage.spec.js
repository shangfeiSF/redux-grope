import zip from 'lodash/zip'

import React from 'react'
import sinon from 'sinon'
import {mount} from 'enzyme'
import ShallowRenderer from 'react-test-renderer/shallow'

import User from '../../../../main/10.real-world/src/components/modules/User'
import List from '../../../../main/10.real-world/src/components/modules/List'

import UserPage from '../../../../main/10.real-world/src/components/UserPage'

const setup = propOverrides => {
  const props = Object.assign({
    login: 'tj',
    user: {
      login: "tj",
      id: 25254,
      avatarUrl: 'https://avatars.githubusercontent.com/u/25254?v=3',
      type: "User"
    },

    starredPagination: {
      ids: [1, 2, 3, 4, 5],
      pageCount: 1,
      isFetching: false,
      nextPageUrl: 'This is nextPageUrl'
    },

    starredRepos: [{
      id: 26505240,
      fullName: 'godoctor/godoctor',
      name: 'godoctor',
      description: 'Go Doctor - The Golang Refactoring Engine'
    }, {
      id: 65794292,
      fullName: 'styled-components/styled-components',
      name: 'styled-components',
      description: 'Visual primitives for the component age 💅'
    }],
    starredRepoOwners: [{
      id: 9682935,
      login: 'godoctor'
    }, {
      id: 20658825,
      login: 'styled-components'
    }],

    loadUser: jest.fn(),

    loadStarred: jest.fn()
  }, propOverrides)

  const renderer = new ShallowRenderer()

  renderer.render(
    <UserPage {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('UserPage', () => {
  it('should display correctly when user is undefined', () => {
    const {output, props} = setup({
      user: undefined
    })

    const i = output.props.children

    expect(output.type).toBe('h1')
    expect(i.type).toBe('i')

    expect(i.props.children).toEqual(['Loading ', props.login, "'s profile..."])
  })

  it('should display correctly', () => {
    const {output, props} = setup()

    expect(output.type).toBe('div')

    const [user, list] = output.props.children

    expect(user.type).toBe(User)
    expect(list.type).toBe(List)

    expect(user.props.user).toEqual(props.user)

    expect(list.props.items).toEqual(zip(props.starredRepos, props.starredRepoOwners))
    expect(list.props.loadingLabel).toEqual(`Loading ${props.login}'s starred...`)
    expect(list.props.ids).toEqual(props.starredPagination.ids)
    expect(list.props.pageCount).toEqual(props.starredPagination.pageCount)
    expect(list.props.isFetching).toEqual(props.starredPagination.isFetching)
    expect(list.props.nextPageUrl).toEqual(props.starredPagination.nextPageUrl)
  })

  it('should loadData on `componentWillMount`', () => {
    const {props} = setup()

    const loadData = sinon.spy(props => {
      const {login} = props

      props.loadUser(login, ['name'])
      props.loadStarred(login)
    })

    const spy = sinon.stub(UserPage.prototype, 'componentWillMount', () => {
      loadData(props)
    })

    const output = mount(<UserPage {...props}></UserPage>)

    expect(spy.calledOnce).toEqual(true)
    expect(loadData.calledOnce).toEqual(true)
    expect(loadData.calledWith(props)).toEqual(true)

    UserPage.prototype.componentWillMount.restore()
  })

  it('should call loadData on `componentWillReceiveProps` if received a new login', () => {
    const {props} = setup()

    const loadData = sinon.spy(props => {
      const {login} = props

      props.loadUser(login, ['name'])
      props.loadStarred(login)
    })

    const spy = sinon.stub(UserPage.prototype, 'componentWillReceiveProps', nextProps => {
      if (nextProps.login !== props.login) {
        loadData(nextProps)
      }
    })

    const output = mount(<UserPage {...props}></UserPage>)

    expect(spy.calledOnce).toEqual(false)

    const {props: nextProps} = setup({
      login: 'shangfeiSF'
    })
    output.setProps(nextProps)

    expect(spy.calledOnce).toEqual(true)
    expect(loadData.calledOnce).toEqual(true)
    expect(loadData.calledWith(nextProps)).toEqual(true)

    UserPage.prototype.componentWillReceiveProps.restore()
  })

  it('should not call loadData on `componentWillReceiveProps` if received a old login', () => {
    const {props} = setup()

    const loadData = sinon.spy(props => {
      const {login} = props

      props.loadUser(login, ['name'])
      props.loadStarred(login)
    })

    const spy = sinon.stub(UserPage.prototype, 'componentWillReceiveProps', nextProps => {
      if (nextProps.login !== props.login) {
        loadData(nextProps)
      }
    })

    const output = mount(<UserPage {...props}></UserPage>)

    expect(spy.calledOnce).toEqual(false)

    const {props: nextProps} = setup({
      login: props.login
    })
    output.setProps(nextProps)

    expect(spy.calledOnce).toEqual(true)
    expect(loadData.calledOnce).toEqual(false)

    UserPage.prototype.componentWillReceiveProps.restore()
  })
})