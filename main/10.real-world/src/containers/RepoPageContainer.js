import polyfill from '../polyfill'

import {connect} from 'react-redux'
import {loadRepo, loadStargazers} from '../actions'

import RepoPage from '../components/RepoPage'

const mapStateToProps = (state, ownProps) => {
  const login = polyfill.replace(ownProps.params.login.toLowerCase())
  const name = polyfill.replace(ownProps.params.name.toLowerCase())

  const {
    pagination: {stargazersByRepo},
    entities: {users, repos}
  } = state

  const fullName = `${login}/${name}`
  const stargazersPagination = stargazersByRepo[fullName] || {ids: []}
  const stargazers = stargazersPagination.ids.map(id => users[id])

  return {
    repo: repos[fullName],
    owner: users[login],

    fullName,
    name,

    stargazers,
    stargazersPagination
  }
}

export default connect(mapStateToProps, {
  loadRepo,
  loadStargazers
})(RepoPage)