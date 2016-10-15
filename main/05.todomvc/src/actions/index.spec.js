import * as ActionTypes from '../constants/ActionTypes'
import * as ActionCreaters from './index'

describe('ActionCreaters', () => {
  it('addActionCreater should create ADD action', () => {
    let text = 'Use Redux'
    let expectValue = {
      type: ActionTypes.ADD,
      text: text
    }

    expect(ActionCreaters.addActionCreater(text))
      .toEqual(expectValue)
  })

  it('deleteActionCreater should create DELETE action', () => {
    let id = 1
    let expectValue = {
      type: ActionTypes.DELETE,
      id: id
    }

    expect(ActionCreaters.deleteActionCreater(id))
      .toEqual(expectValue)
  })

  it('editActionCreater should create EDIT action', () => {
    let id = 1
    let newText = 'Use Redux everywhere'
    let expectValue = {
      type: ActionTypes.EDIT,
      id: id,
      text: newText
    }

    expect(ActionCreaters.editActionCreater(id, newText))
      .toEqual(expectValue)
  })

  it('completeActionCreater should create COMPLETE action', () => {
    let id = 1
    let expectValue = {
      type: ActionTypes.COMPLETE,
      id: id
    }

    expect(ActionCreaters.completeActionCreater(id))
      .toEqual(expectValue)
  })

  it('completeAllActionCreater should create COMPLETE_ALL action', () => {
    let expectValue = {
      type: ActionTypes.COMPLETE_ALL
    }

    expect(ActionCreaters.completeAllActionCreater())
      .toEqual(expectValue)
  })

  it('clearCompletedActionCreater should create CLEAR_COMPLETED action', () => {
    let expectValue = {
      type: ActionTypes.CLEAR_COMPLETED
    }

    expect(ActionCreaters.clearCompletedActionCreater())
      .toEqual(expectValue)
  })
})