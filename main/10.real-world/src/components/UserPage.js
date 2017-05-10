import zip from 'lodash/zip'
import React, {Component, PropTypes} from 'react'

import Repo from './modules/Repo'
import User from './modules/User'
import List from './modules/List'

class UserPage extends Component {
  static propTypes = {
    login: PropTypes.string.isRequired,
    user: PropTypes.object,

    starredPagination: PropTypes.object,

    starredRepos: PropTypes.array.isRequired,
    starredRepoOwners: PropTypes.array.isRequired,

    loadUser: PropTypes.func.isRequired,
    loadStarred: PropTypes.func.isRequired
  }

  loadData(props) {
    props.loadUser()
    props.loadStarred()
  }

  componentWillMount() {
    this.loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      this.loadData(nextProps)
    }
  }

  _handleLoadMoreClick = () => {
    this.props.loadStarred(this.props.login, true)
  }

  _renderRepo([repo, owner]) {
    return <Repo repo={repo} owner={owner} key={repo.fullName}/>
  }

  render() {
    const {user, login} = this.props

    if (!user) {
      return <h1><i>Loading {login}{"'s profile..."}</i></h1>
    }

    const {starredRepos, starredRepoOwners, starredPagination} = this.props

    return (
      <div>
        <User user={user}/>
        <List
          items={zip(starredRepos, starredRepoOwners)}
          renderItems={this._renderRepo}
          onLoadMoreClick={this._handleLoadMoreClick}
          loadingLabel={`Loading ${login}'s starred...`}
          {...starredPagination}
        />
      </div>
    )
  }
}

export default UserPage