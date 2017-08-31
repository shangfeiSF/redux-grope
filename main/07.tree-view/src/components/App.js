import React, {Component} from 'react'
import PropTypes from 'prop-types'

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
        <Rebuild tree={tree} actions={actions}></Rebuild>
      </div>
    )
  }
}

export default App