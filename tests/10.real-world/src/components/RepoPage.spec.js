import React from 'react'
import sinon from 'sinon'
import {mount} from 'enzyme'
import ShallowRenderer from 'react-test-renderer/shallow'

import Repo from '../../../../main/10.real-world/src/components/modules/Repo'
import List from '../../../../main/10.real-world/src/components/modules/List'

import RepoPage from '../../../../main/10.real-world/src/components/RepoPage'

const setup = propOverrides => {
  const props = Object.assign({
    repo: {
      id: 10270250,
      name: 'react',
      full_name: 'facebook/react'
    },
    owner: {
      login: 'facebook',
      id: 69631,
      type: 'Organization'
    },

    name: 'react',
    fullName: 'facebook/react',

    stargazersPagination: {
      ids: [1, 2, 3, 4, 5],
      pageCount: 1,
      isFetching: false,
      nextPageUrl: 'This is nextPageUrl'
    },
    stargazers: [],

    loadRepo: jest.fn(),

    loadStargazers: jest.fn()
  }, propOverrides)

  const renderer = new ShallowRenderer()

  renderer.render(
    <RepoPage {...props} />
  )

  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('RepoPage', () => {
  it('should display correctly when repo or owner is undefined', () => {
    const {output, props} = setup({
      repo: undefined
    })

    const i = output.props.children

    expect(output.type).toBe('h1')
    expect(i.type).toBe('i')

    expect(i.props.children).toEqual(['Loading ', props.name, ' details...'])
  })

  it('should display correctly', () => {
    const {output, props} = setup()

    expect(output.type).toBe('div')

    const [repo, list] = output.props.children

    expect(repo.type).toBe(Repo)
    expect(list.type).toBe(List)

    expect(repo.props.repo).toEqual(props.repo)
    expect(repo.props.owner).toEqual(props.owner)

    expect(list.props.items).toEqual(props.stargazers)
    expect(list.props.loadingLabel).toEqual(`Loading stargazers of ${props.name}...`)
    expect(list.props.ids).toEqual(props.stargazersPagination.ids)
    expect(list.props.pageCount).toEqual(props.stargazersPagination.pageCount)
    expect(list.props.isFetching).toEqual(props.stargazersPagination.isFetching)
    expect(list.props.nextPageUrl).toEqual(props.stargazersPagination.nextPageUrl)
  })

  it('should loadData on `componentWillMount`', () => {
    const {props} = setup()

    const loadData = sinon.spy(props => {
      const {fullName} = props

      props.loadRepo(fullName, ['description'])
      props.loadStargazers(fullName)
    })

    const spy = sinon.stub(RepoPage.prototype, 'componentWillMount', () => {
      loadData(props)
    })

    const output = mount(<RepoPage {...props}></RepoPage>)

    expect(spy.calledOnce).toEqual(true)
    expect(loadData.calledOnce).toEqual(true)
    expect(loadData.calledWith(props)).toEqual(true)

    RepoPage.prototype.componentWillMount.restore()
  })

  it('should call loadData on `componentWillReceiveProps` if received a new fullname', () => {
    const {props} = setup()

    const loadData = sinon.spy(props => {
      const {fullName} = props

      props.loadRepo(fullName, ['description'])
      props.loadStargazers(fullName)
    })

    const spy = sinon.stub(RepoPage.prototype, 'componentWillReceiveProps', nextProps => {
      if (nextProps.fullName !== props.fullName) {
        loadData(nextProps)
      }
    })

    const output = mount(<RepoPage {...props}></RepoPage>)

    expect(spy.calledOnce).toEqual(false)

    const {props: nextProps} = setup({
      fullName: 'facebook/jest'
    })
    output.setProps(nextProps)

    expect(spy.calledOnce).toEqual(true)
    expect(loadData.calledOnce).toEqual(true)
    expect(loadData.calledWith(nextProps)).toEqual(true)

    RepoPage.prototype.componentWillReceiveProps.restore()
  })

  it('should not call loadData on `componentWillReceiveProps` if received a old fullname', () => {
    const {props} = setup()

    const loadData = sinon.spy(props => {
      const {fullName} = props

      props.loadRepo(fullName, ['description'])
      props.loadStargazers(fullName)
    })

    const spy = sinon.stub(RepoPage.prototype, 'componentWillReceiveProps', nextProps => {
      if (nextProps.fullName !== props.fullName) {
        loadData(nextProps)
      }
    })

    const output = mount(<RepoPage {...props}></RepoPage>)

    expect(spy.calledOnce).toEqual(false)

    const {props: nextProps} = setup({
      fullName: props.fullName
    })
    output.setProps(nextProps)

    expect(spy.calledOnce).toEqual(true)
    expect(loadData.calledOnce).toEqual(false)

    RepoPage.prototype.componentWillReceiveProps.restore()
  })
})