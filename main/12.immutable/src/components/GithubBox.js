import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

class GithubBox extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired
  }

  render() {
    const {data, userId} = this.props

    return (
      <div>
        <div>
          <h3 userId={userId}>{data.get('name')}</h3>
          <img style={{width: '100px', height: '100px'}} src={data.get('avatar_url')}/>
          <p>Followers : {data.get('followers')}</p>
          <p>Following : {data.get('following')}</p>
          <p>
            <Link to="/12.immutable/">Back</Link>
          </p>
        </div>
      </div>
    )
  }
}

export default GithubBox