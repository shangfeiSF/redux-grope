import React, {Component} from 'react'
import PropTypes from 'prop-types'

class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

export default App