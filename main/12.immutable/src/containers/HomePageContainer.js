import {connect} from 'react-redux'

import HomePage from '../components/HomePage'

import {changeUserId} from '../actions/githubActions'

const mapStateToProps = (state) => ({
  userId: state.getIn(['github', 'userId'])
})

const mapDispatchToProps = dispatch => ({
  onChangeUserId: userId => (
    dispatch(changeUserId(userId))
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)