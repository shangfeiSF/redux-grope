import {browserHistory} from 'react-router'
import React, {Component, PropTypes} from 'react'

class Explore extends Component {
  static propTypes = {
    inputValue: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.inputValue) {
      this.refs.input.value = nextProps.inputValue
    }
  }

  handlerOnKeyUp = (e) => {
    e.keyCode === 13 && this.handlerOnClickGo()
  }

  handlerOnClickGo = () => {
    browserHistory.push(`/10.real-world/${this.refs.input.value}`)
  }

  handlerOnClickDismiss = e => {
    e.preventDefault()
    this.props.resetErrorMessage()
  }

  renderExploreArea() {
    const {inputValue} = this.props

    return (
      <div className="exploreArea">
        <h4>Please input a username or a full reponame then click 'Go':</h4>
        <input
          ref="input"
          size="30"
          style={{marginRight: 10}}
          defaultValue={inputValue}
          onKeyUp={this.handlerOnKeyUp}
        />
        <button onClick={this.handlerOnClickGo}>Go!</button>
      </div>
    )
  }

  renderErrorMessage() {
    const {errorMessage} = this.props

    return !errorMessage.spec ? null : (
        <div className="errorMessage">
          <p style={{backgroundColor: '#e99', padding: 10}}>
            <b>{errorMessage.spec}</b>
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