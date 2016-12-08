import polyfill from '../polyfill'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import RepoPage from '../components/RepoPage'

import {loadRepo, loadStargazers} from '../actions/repoPageThunkActions'

const mapStateToProps = (state, ownProps) => {
  const {pagination: {stargazersByRepo}, entities: {users, repos}} = state

  const login = polyfill.replace(ownProps.params.login.toLowerCase())
  const name = polyfill.replace(ownProps.params.name.toLowerCase())

  const fullName = `${login}/${name}`

  const stargazersPagination = stargazersByRepo[fullName] || {ids: []}
  const stargazers = stargazersPagination.ids.map(id => users[id])

  return {
    repo: repos[fullName],
    owner: users[login],

    name,
    fullName,

    stargazersPagination,
    stargazers,
  }
}

const mapDispatchToProps = dispatch => ({
  loadRepo: bindActionCreators(loadRepo, dispatch),

  loadStargazers: bindActionCreators(loadStargazers, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoPage)