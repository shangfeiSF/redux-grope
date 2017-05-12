import React, {Component, PropTypes} from 'react'

import Repo from './modules/Repo'
import User from './modules/User'
import List from './modules/List'

class RepoPage extends Component {
  static propTypes = {
    repo: PropTypes.object,
    owner: PropTypes.object,

    name: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,

    stargazersPagination: PropTypes.object,
    stargazers: PropTypes.array.isRequired,

    loadRepo: PropTypes.func.isRequired,
    loadStargazers: PropTypes.func.isRequired,
    loadMoreStargazers: PropTypes.func.isRequired
  }

  loadData(props) {
    props.loadRepo()
    props.loadStargazers()
  }

  componentWillMount() {
    this.loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      this.loadData(nextProps)
    }
  }

  _handlerOnLoadMoreClick = () => {
    this.props.loadMoreStargazers()
  }

  _renderUser(user) {
    return <User user={user} key={user.login}/>
  }

  render() {
    const {repo, owner, name} = this.props

    if (!repo || !owner) {
      return <h1><i>Loading {name} details...</i></h1>
    }

    const {stargazers, stargazersPagination} = this.props

    return (
      <div>
        <h4>Repo Profile</h4>
        <Repo repo={repo} owner={owner}/>
        <h4>Stargazers</h4>
        <List
          items={stargazers}
          renderItems={this._renderUser}
          onLoadMoreClick={this._handlerOnLoadMoreClick}
          loadingLabel={`Loading stargazers of ${name}...`}
          {...stargazersPagination}
        />
      </div>
    )
  }
}

export default RepoPage