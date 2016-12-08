import React, {Component, PropTypes} from 'react'

import Explore from './modules/Explore'

class App extends Component {
  static propTypes = {
    inputValue: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,

    children: PropTypes.node
  }

  render() {
    const {inputValue, errorMessage, resetErrorMessage} = this.props

    return (
      <div>
        <Explore
          inputValue={inputValue}
          errorMessage={errorMessage}
          resetErrorMessage={resetErrorMessage}
        />
        {this.props.children}
      </div>
    )
  }
}

export default App