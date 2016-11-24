import {mockData} from './mocks/utils/index'

import * as ActionTypes from '../../../../main/08.async/src/constants/ActionTypes'
import * as syncActions from '../../../../main/08.async/src/actions/syncActions'

describe('syncActions', () => {
  it('select should create `SELECT` action', () => {
    let theme = 'facebook'

    let expectedValue = {
      type: ActionTypes.SELECT,
      theme
    }

    expect(syncActions.select(theme)).toEqual(expectedValue)
  })

  it('add should create `ADD` action', () => {
    let theme = 'facebook'

    let expectedValue = {
      type: ActionTypes.ADD,
      theme
    }

    expect(syncActions.add(theme)).toEqual(expectedValue)
  })

  it('request should create `REQUEST` action', () => {
    let theme = 'facebook'

    let expectedValue = {
      type: ActionTypes.REQUEST,
      theme
    }

    expect(syncActions.request(theme)).toEqual(expectedValue)
  })

  it('receive should create `RECEIVE` action', () => {
    let theme = 'facebook'
    const json = {
      data: {
        children: mockData.contexts.map(context => {
          return {
            data: context
          }
        })
      }
    }

    let receivedValue = syncActions.receive(theme, json)

    expect(receivedValue.type).toEqual(ActionTypes.RECEIVE)
    expect(receivedValue.theme).toEqual(theme)
    expect(receivedValue.contexts).toEqual(mockData.contexts)
    expect(typeof receivedValue.lastUpdated).toEqual('string')
  })

  it('refresh should create `REFRESH` action', () => {
    let theme = 'facebook'

    let expectedValue = {
      type: ActionTypes.REFRESH,
      theme
    }

    expect(syncActions.refresh(theme)).toEqual(expectedValue)
  })
})