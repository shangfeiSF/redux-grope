import React, {Component, PropTypes} from 'react'

class Node extends Component {
  static propTypes = {
    tree: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  incrementClick = e => {
    e.preventDefault()

    const {actions, id} = this.props

    actions.increment(id)
  }

  addChildClick = (e) => {
    e.preventDefault()

    const {actions, id, tree} = this.props

    const childId = actions.createNode(tree.length).id
    actions.addChild(id, childId)
  }

  removeChildClick = (e) => {
    e.preventDefault()

    const {actions, parentId, id} = this.props

    actions.removeChild(parentId, id)
    actions.deleteNode(id)
  }

  renderChildNode = childId => {
    const {id, tree, actions} = this.props

    return (
      <li key={childId}>
        <Node id={childId} tree={tree} actions={actions} parentId={id}/>
      </li>
    )
  }

  render() {
    const {id, tree, parentId} = this.props

    if (id === undefined) {
      return (
        <h1>no Tree to view</h1>
        
      )
    }

    let childIds = tree[id].childIds
    let counter = tree[id].counter

    let aStyle = {
      marginLeft: 10,
      textAlign: 'center',
      textDecoration: 'none',
      color: '#a5a5a5'
    }

    let foldButton = (<a href="#" onClick={this.incrementClick} style={aStyle}></a>)
    let incrementButton = (<a href="#" onClick={this.incrementClick} style={{textDecoration: 'none'}}>({counter})</a>)
    let removeButton = typeof parentId === undefined ? null : (
      <a href="#" onClick={this.removeChildClick} style={aStyle}>×</a>
    )
    let addButton = (<a href="#" onClick={this.addChildClick} style={aStyle}>+</a>)

    let childNodes = childIds.map(this.renderChildNode)

    return (
      <div className="node">
        <div className="info" style={{paddingTop: '10, 0'}}>
          {foldButton}
          <strong>{id}</strong> --- {incrementButton}
          {addButton}
          {removeButton}
        </div>

        <ul className="childNode" style={{margin: 0}}>
          {childNodes}
        </ul>
      </div>
    )
  }
}

export default Node