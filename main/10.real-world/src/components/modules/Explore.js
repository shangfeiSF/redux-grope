import {browserHistory} from 'react-router'
import React, {Component, PropTypes} from 'react'

class Explore extends Component {
  static propTypes = {
    inputValue: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.refs.input.value = nextProps.value
    }
  }

  handlerOnKeyUp = (e) => {
    e.keyCode === 13 && this.handlerOnClick()
  }

  handlerOnClickGo = () => {
    browserHistory.push(`/${this.refs.input.value}`)
  }

  handlerOnClickDismiss = e => {
    e.preventDefault()
    this.props.resetErrorMessage()
  }

  renderExploreArea(){
    const {inputValue} = this.props

    return (
      <div className="exploreArea">
        <p>input a username or a repo full name then click 'Go':</p>
        <input
          ref="input"
          size="30"
          defaultValue={inputValue}
          onKeyUp={this.handlerOnKeyUp}
        />
        <button onClick={this.handlerOnClickGo}>Go!</button>
      </div>
    )
  }

  renderErrorMessage() {
    const {errorMessage} = this.props

    return !errorMessage ? null : (
    <div className="errorMessage">
      <p style={{backgroundColor: '#e99', padding: 10}}>
        <b>{errorMessage}</b>
        <a href="#" onClick={this.handlerOnClickDismiss}>(Dismiss)</a>
      </p>
    </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderExploreArea()}
        {this.renderErrorMessage()}
      </div>
    )
  }
}

export default Explore