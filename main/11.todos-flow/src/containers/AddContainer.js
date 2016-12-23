import {connect} from 'react-redux'

import type {Connector} from 'react-redux'
import type {State, Dispatch} from '../types'
type Props = {
  dispatch: Dispatch
}

import Add from '../components/Add'
import {add} from '../actions'

const mapStateToProps = (state: State) => ({})

const mapDispatchToProps = ({
  onSubmit: add
})

const connector: Connector<{}, Props> = connect(mapStateToProps, mapDispatchToProps)

export default connector(Add)