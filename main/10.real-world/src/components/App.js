import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'

import Explore from './modules/Explore'

class App extends Component {
  static propTypes = {
    inputValue: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,

    children: PropTypes.node
  }

  handleDismissClick = e => {
    e.preventDefault()

    this.props.resetErrorMessage()
  }

  handleChange = nextValue => {
    browserHistory.push(`/${nextValue}`)
  }

  renderErrorMessage() {
    const {errorMessage} = this.props

    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        <a href="#" onClick={this.handleDismissClick}>(Dismiss)</a>
      </p>
    )
  }

  render() {
    const {children, inputValue} = this.props

    return (
      <div>
        <Explore value={inputValue} onChange={this.handleChange}/>
        {this.renderErrorMessage()}
        {children}
      </div>
    )
  }
}

export default App