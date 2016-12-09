import polyfill from '../polyfill'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import UserPage from '../components/UserPage'

import {loadUser, loadStarred} from '../actions/userPageThunkActions'

const mapStateToProps = (state, ownProps) => {
  const {pagination: {starredByUser}, entities: {users, repos}} = state

  const login = polyfill.replace(ownProps.params.login.toLowerCase())

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

const mapDispatchToProps = dispatch => ({
  loadUser: bindActionCreators(loadUser, dispatch),

  loadStarred: bindActionCreators(loadStarred, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage)
