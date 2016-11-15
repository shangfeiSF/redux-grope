import React, {Component, PropTypes} from 'react'

import Node from './Node'
import Rebuild from './Rebuild'

class App extends Component {
  static propTypes = {
    tree: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  render() {
    const {id, tree, actions} = this.props

    return (
      <div>
        <Node id={id} tree={tree} actions={actions}></Node>
        <Rebuild rootId={tree.rootId} actions={actions}></Rebuild>
      </div>
    )
  }
}

export default App