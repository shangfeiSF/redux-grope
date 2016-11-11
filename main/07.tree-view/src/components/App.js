import React, {Component, PropTypes} from 'react'

import Node from './Node'

class App extends Component {
  static propTypes = {
    tree: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  render() {
    const {id, tree, actions} = this.props

    return (
      <Node id={id} tree={tree} actions={actions}></Node>
    )
  }
}

export default App