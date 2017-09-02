import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

class User extends Component {
  static propTypes = {
    user: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired
  }

  render() {
    const {user: {login, avatarUrl, name}} = this.props

    return (
      <div className="User" style={{marginTop: 10}}>
        <Link to={`/10.real-world/${login}`}>
          <img src={avatarUrl} alt={login} width="72" height="72"/>
          <h3>
            {login} {name && <span>{`(${name})`}</span>}
          </h3>
        </Link>
      </div>
    )
  }
}

export default User