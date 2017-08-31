import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link, browserHistory} from 'react-router'

class HomePage extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    onChangeUserId: PropTypes.func.isRequired
  }

  handlerOnKeyUp = (e) => {
    e.keyCode === 13 && this.handlerOnSubmit()
  }

  handlerOnSubmit = () => {
    if (this.refs.input.value) {
      this.props.onChangeUserId(this.refs.input.value)
      browserHistory.push(`/12.immutable/result/${this.refs.input.value}`)
    }
  }

  render() {
    return (
      <div>
        <h2>Please Input a Github User Id</h2>
        <input ref="input" style={{marginRight: '10px'}} onKeyUp={this.handlerOnKeyUp}/>
        <button onClick={this.handlerOnSubmit}>Go</button>
      </div>
    )
  }
}

export default HomePage