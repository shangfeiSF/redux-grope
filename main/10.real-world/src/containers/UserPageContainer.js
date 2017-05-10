import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import UserPage from '../components/UserPage'

import {loadUser, loadStarred} from '../actions/userPageThunkActions'

// https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

// mapStateToProp(state, ownProps)可以是Function or null or undefined
// mapStateToProps的返回值必须是一个纯对象(null, undefined会使视图层不响应store更新)
const mapStateToProps = (state, ownProps) => {
  let _state = state.toJS()

  const {pagination: {starredByUser}, entities: {users, repos}} = _state

  const login = ownProps.params.login

  const starredPagination = starredByUser[login] || {ids: []}
  const starredRepos = starredPagination.ids.map(id => repos[id])
  const starredRepoOwners = starredRepos.map(repo => users[repo.owner])

  return {
    login,
    user: users[login],

    starredPagination,

    starredRepos,
    starredRepoOwners
  }
}

// mapDispatchToProps(dispatch, ownProps)是Function or Object
const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUser: bindActionCreators(loadUser, dispatch),

  loadStarred: bindActionCreators(loadStarred, dispatch)
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {

  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    loadUser: () => dispatchProps.loadUser(stateProps.login, ['name']),

    loadStarred: () => dispatchProps.loadStarred(stateProps.login)
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UserPage)
