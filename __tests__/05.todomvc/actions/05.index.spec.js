import * as ActionTypes from '../../../main/05.todomvc/src/constants/ActionTypes'
import * as ActionCreaters from '../../../main/05.todomvc/src/actions/index'

describe('ActionCreaters', () => {
  it('addActionCreater should create `ADD` action', () => {
    let text = 'Use Redux'
    let expectedValue = {
      type: ActionTypes.ADD,
      text: text
    }

    expect(ActionCreaters.addActionCreater(text))
      .toEqual(expectedValue)
  })

  it('deleteActionCreater should create `DELETE` action', () => {
    let id = 1
    let expectedValue = {
      type: ActionTypes.DELETE,
      id: id
    }

    expect(ActionCreaters.deleteActionCreater(id))
      .toEqual(expectedValue)
  })

  it('editActionCreater should create `EDIT` action', () => {
    let id = 1
    let newText = 'Use Redux everywhere'
    let expectedValue = {
      type: ActionTypes.EDIT,
      id: id,
      text: newText
    }

    expect(ActionCreaters.editActionCreater(id, newText))
      .toEqual(expectedValue)
  })

  it('completeActionCreater should create `COMPLETE` action', () => {
    let id = 1
    let expectedValue = {
      type: ActionTypes.COMPLETE,
      id: id
    }

    expect(ActionCreaters.completeActionCreater(id))
      .toEqual(expectedValue)
  })

  it('completeAllActionCreater should create `COMPLETE_ALL` action', () => {
    let expectedValue = {
      type: ActionTypes.COMPLETE_ALL
    }

    expect(ActionCreaters.completeAllActionCreater())
      .toEqual(expectedValue)
  })

  it('clearCompletedActionCreater should create `CLEAR_COMPLETED` action', () => {
    let expectedValue = {
      type: ActionTypes.CLEAR_COMPLETED
    }

    expect(ActionCreaters.clearCompletedActionCreater())
      .toEqual(expectedValue)
  })
})