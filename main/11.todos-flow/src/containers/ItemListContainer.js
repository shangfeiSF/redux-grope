// @flow

import {connect} from 'react-redux'

import type {Connector} from 'react-redux'
import type {State, Dispatch} from '../types'
import type {Props} from '../components/ItemList'

import ItemListComp from '../components/ItemList'
import {toggle} from '../actions'

import {ALL, ACTIVE, COMPLETED} from '../constants/FilterTypes'

const filterHandler = (items, filter) => {
  switch (filter) {
    case ACTIVE:
      return items.filter(item => !item.completed)

    case COMPLETED:
      return items.filter(item => item.completed)

    case ALL:
    default:
      return items
  }
}

const mapStateToProps = (state: State) => ({
  items: filterHandler(state.items, state.filter)
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

export default connector(ItemListComp)