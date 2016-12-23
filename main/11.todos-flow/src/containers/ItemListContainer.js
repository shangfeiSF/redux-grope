// @flow

import {connect} from 'react-redux'

import type {Connector} from 'react-redux'
import type {Id, State, Dispatch} from '../types'
import type {Props} from '../components/ItemList'

import {ALL, ACTIVE, COMPLETED} from '../constants/FilterTypes'
import ItemList from '../components/ItemList'
import {toggle} from '../actions'

const filterHandler = (todos, filter) => {
  switch (filter) {
    case ACTIVE:
      return todos.filter(t => !t.completed)

    case COMPLETED:
      return todos.filter(t => t.completed)

    case ALL:
    default:
      return todos
  }
}

const mapStateToProps = (state: State) => ({
  items: filterHandler(state.todos, state.filter)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onItemClick: (id: Id) => {
    dispatch(toggle(id))
  }
})

const connector: Connector<{}, Props> = connect(mapStateToProps, mapDispatchToProps)

export default connector(ItemList)