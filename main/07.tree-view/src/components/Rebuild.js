import React, {Component, PropTypes} from 'react'

class Rebuild extends Component {
  static propTypes = {
    tree: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  rebuildClick = (e) => {
    e.preventDefault()

    let {tree, actions} = this.props

    actions.rebuildTree(tree.rootId)
  }

  render() {
    let {tree} = this.props

    let sortedIds = Object.keys(tree)
      .filter(key => {
        return parseInt(key) == parseInt(key)
      })
      .sort((a, b) => {
        return parseInt(a) - parseInt(b)
      })

    let maxId = parseInt(sortedIds.pop())

    return maxId <= tree.threshold ? (
      <p>
        <button onClick={this.rebuildClick}>Rebuild Tree</button>
      </p>
    ) : null
  }
}

export default Rebuild