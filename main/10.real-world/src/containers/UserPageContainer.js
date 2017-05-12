import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import UserPage from '../components/UserPage'

import {loadUser, loadStarred} from '../actions/userPageThunkActions'

// https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

// [mapStateToProp(state, [ownProps]): stateProps] (Function or null or undefined)
// If you don't want to subscribe to store updates, pass `null` or `undefined` in place of `mapStateToProps`.
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

// [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Function or Object)
// Each function inside `mapDispatchToProps` is assumed to be a Redux action creator.
// The object return from `mapDispatchToProps` with the same function names,
// but with every action creator wrapped into a dispatch call so they may be called directly
const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUser: bindActionCreators(loadUser, dispatch),

  loadStarred: bindActionCreators(loadStarred, dispatch)
})

// [mergeProps(stateProps, dispatchProps, ownProps): props] (Function)
// The plain object you return from `mergeProps` will be passed as props to the wrapped component.
//  If you omit `mergeProps`, Object.assign({}, ownProps, stateProps, dispatchProps) is used by default.
const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    loadUser: () => dispatchProps.loadUser(stateProps.login, ['name']),

    loadStarred: () => dispatchProps.loadStarred(stateProps.login),

    loadMoreStarred: () => dispatchProps.loadStarred(stateProps.login, true)
  })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UserPage)
