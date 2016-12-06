import {connect} from 'react-redux'
import {loadUser, loadStarred} from '../actions'

import UserPage from '../components/UserPage'

const mapStateToProps = (state, ownProps) => {
  const login = ownProps.params.login.toLowerCase()

  const {
    pagination: {starredByUser},
    entities: {users, repos}
  } = state

  const starredPagination = starredByUser[login] || {ids: []}
  const starredRepos = starredPagination.ids.map(id => repos[id])
  const starredRepoOwners = starredRepos.map(repo => users[repo.owner])

  return {
    login,
    user: users[login],

    starredRepos,
    starredRepoOwners,

    starredPagination
  }
}

export default connect(mapStateToProps, {
  loadUser,
  loadStarred
})(UserPage)
