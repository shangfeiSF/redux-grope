import React, {Component, PropTypes} from 'react'

class Rebuild extends Component {
  static propTypes = {
    rootId: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
  }

  rebuildClick = (e) => {
    e.preventDefault()

    const {rootId, actions} = this.props

    actions.rebuildTree(rootId)
  }

  render() {
    return (
      <p>
        <button onClick={this.rebuildClick}>Rebuild Tree</button>
      </p>
    )
  }
}

export default Rebuild