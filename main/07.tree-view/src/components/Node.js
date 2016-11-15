import React, {Component, PropTypes} from 'react'


class Node extends Component {
  static propTypes = {
    tree: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  generateTree = e => {
    e.preventDefault()

    const {actions} = this.props

    let configOverrides = {
      rootId: 0,
      total: parseInt(this.refs.total.value),
      dilution: parseInt(this.refs.dilution.value),
      limit: parseInt(this.refs.limit.value),
    }

    actions.generateTree(configOverrides)
  }

  incrementClick = e => {
    e.preventDefault()

    const {actions, id} = this.props

    actions.increment(id)
  }

  addChildClick = e => {
    e.preventDefault()

    const {actions, id, tree} = this.props

    const childId = actions.createNode(tree.length).id
    actions.addChild(id, childId)
  }

  removeChildClick = e => {
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
        <div>
          <h1>There is no Tree to view</h1>
          <h4>Please set up the tree config used to draw the tree.</h4>
          <table>
            <tbody>
            <tr>
              <td>total</td>
              <td>
                <input type="number" ref="total" onChange={function(){}}/>
              </td>
            </tr>
            <tr>
              <td>dilution</td>
              <td>
                <input type="number" ref="dilution" onChange={function(){}}/>
              </td>
            </tr>
            <tr>
              <td>limit</td>
              <td>
                <input type="number" ref="limit" onChange={function(){}}/>
              </td>
            </tr>
            </tbody>
          </table>
          <br/>
          <button onClick={this.generateTree}>Generate Tree</button>
        </div>
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