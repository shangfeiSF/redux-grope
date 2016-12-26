// @flow

import {connect} from 'react-redux'

import type {Connector} from 'react-redux'
import type {State, Dispatch} from '../types'
import type {Props} from '../components/Add'

import Add from '../components/Add'
import {add} from '../actions'

const mapStateToProps = (state: State) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (value) => {
    dispatch(add(value))
  }
})

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(Add)