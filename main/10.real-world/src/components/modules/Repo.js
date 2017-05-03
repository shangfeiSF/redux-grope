import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

class Repo extends Component {
  static propTypes = {
    repo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired,

    owner: PropTypes.shape({
      login: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const {repo: {name, description}, owner: {login}} = this.props

    return (
      <div className="Repo">
        <h3>
          <Link to={`/10.real-world/${login}/${name}`}>{name}</Link>
          {' by '}
          <Link to={`/10.real-world/${login}`}>{login}</Link>
        </h3>
        {description && <p>{description}</p> }
      </div>
    )
  }
}

export default Repo