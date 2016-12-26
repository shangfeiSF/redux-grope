// @flow

import {connect} from 'react-redux'

import type {Connector} from 'react-redux'
import type {State, Dispatch} from '../types'
import type {Props} from '../components/ItemList'

import ItemList from '../components/ItemList'
import {toggle} from '../actions'

import {ALL, ACTIVE, COMPLETED} from '../constants/FilterTypes'

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
  onItemClick: (id) => {
    dispatch(toggle(id))
  }
})

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(ItemList)