// @flow

import {connect} from 'react-redux'

import type {Connector} from 'react-redux'
import type {State, Dispatch, Filter} from '../types'
import type {Props} from '../components/Filter'
type OwnProps = {
  filter: Filter
}

import FilterComp from '../components/Filter'
import {filter} from '../actions'

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  active: ownProps.filter === state.filter
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => ({
  onClick: () => {
    dispatch(filter(ownProps.filter))
  }
})

const connector: Connector<OwnProps, Props> = connect(mapStateToProps, mapDispatchToProps)

export default connector(FilterComp)