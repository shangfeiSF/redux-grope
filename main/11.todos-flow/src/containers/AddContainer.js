// @flow

import {connect} from 'react-redux'

import type {Connector} from 'react-redux'
import type {State, Dispatch} from '../types'
import type {Props} from '../components/Add'

import AddComp from '../components/Add'
import {add} from '../actions'

const mapStateToProps = (state: State) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (value) => {
    dispatch(add(value))
  }
})

// http://www.typescriptlang.org/docs/handbook/generics.html
const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(AddComp)