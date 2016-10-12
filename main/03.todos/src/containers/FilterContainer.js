import {connect} from 'react-redux'

import Filter from '../components/Filter'

import {filter} from '../actions'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.filter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(filter(ownProps.filter))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)