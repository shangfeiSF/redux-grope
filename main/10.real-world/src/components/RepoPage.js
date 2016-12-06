import React, {Component, PropTypes} from 'react'

import Repo from './modules/Repo'
import User from './modules/User'
import List from './modules/List'

class RepoPage extends Component {
  static propTypes = {
    repo: PropTypes.object,
    owner: PropTypes.object,

    fullName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,

    stargazers: PropTypes.array.isRequired,
    stargazersPagination: PropTypes.object,

    loadRepo: PropTypes.func.isRequired,
    loadStargazers: PropTypes.func.isRequired
  }

  loadData(props) {
    const {fullName} = props
    props.loadRepo(fullName, ['description'])
    props.loadStargazers(fullName)
  }

  componentWillMount() {
    this.loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      this.loadData(nextProps)
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadStargazers(this.props.fullName, true)
  }

  renderUser(user) {
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
        <Repo repo={repo} owner={owner}/>
        <List
          items={stargazers}
          renderItem={this.renderUser}
          onLoadMoreClick={this.handleLoadMoreClick}
          loadingLabel={`Loading stargazers of ${name}...`}
          {...stargazersPagination}
        />
      </div>
    )
  }
}

export default RepoPage