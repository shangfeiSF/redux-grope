import {connect} from 'react-redux'

import Add from '../components/Add'

import {add} from '../actions'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = ({
  onSubmit: add
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add)