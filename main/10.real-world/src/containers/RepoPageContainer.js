import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import RepoPage from '../components/RepoPage'

import {loadRepo, loadStargazers} from '../actions/repoPageThunkActions'

const mapStateToProps = (state, ownProps) => {
  const users = state.getIn(['entities', 'users'])
  const repos = state.getIn(['entities', 'repos'])
  const stargazersByRepo = state.getIn(['pagination', 'stargazersByRepo'])

  const login = ownProps.params.login
  const name = ownProps.params.name

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

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    loadRepo: () => dispatchProps.loadRepo(stateProps.fullName, ['description']),

    loadStargazers: () => dispatchProps.loadStargazers(stateProps.fullName),

    loadMoreStargazers: () => dispatchProps.loadStargazers(stateProps.fullName, true)
  })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(RepoPage)