import React, {Component, PropTypes} from 'react'

class Node extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
  }

  static propTypes = {
    tree: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  generateTreeClick = e => {
    e.preventDefault()

    const {actions} = this.props

    let configOverrides = {
      rootId: parseInt(this.refs.rootId.value) || 0,
      total: parseInt(this.refs.total.value) || 2,
      dilution: parseInt(this.refs.dilution.value) || 1,
      limit: parseInt(this.refs.limit.value) || 1,
      threshold: parseInt(this.refs.threshold.value) || 10
    }

    actions.generateTree(configOverrides)
  }

  foldClick = e => {
    e.preventDefault()

    let show = !this.state.show

    this.setState({
      show: show
    })
  }

  incrementClick = e => {
    e.preventDefault()

    const {actions, id} = this.props

    actions.increment(id)
  }

  addChildClick = e => {
    e.preventDefault()

    const {actions, id, tree} = this.props

    let ids = Object.keys(tree).filter((key) => {
      return parseInt(key) == parseInt(key)
    })

    this.setState({
      show: true
    })

    const childId = actions.createNode(Math.max(...ids)).id
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

  renderGenerateArea = () => {
    return (
      <div>
        <h1>There is no Tree to view</h1>
        <h4>Please set up the tree config used to draw the tree.</h4>

        <table>
          <tbody>
          <tr>
            <td>rootId</td>
            <td>
              <input type="number" ref="rootId"/>
            </td>
          </tr>

          <tr>
            <td>total</td>
            <td>
              <input type="number" ref="total"/>
            </td>
          </tr>

          <tr>
            <td>dilution</td>
            <td>
              <input type="number" ref="dilution"/>
            </td>
          </tr>

          <tr>
            <td>limit</td>
            <td>
              <input type="number" ref="limit"/>
            </td>
          </tr>

          <tr>
            <td>threshold</td>
            <td>
              <input type="number" ref="threshold"/>
            </td>
          </tr>
          </tbody>
        </table>
        <p>
          <button onClick={this.generateTreeClick}>Generate Tree</button>
        </p>
      </div>
    )
  }

  render() {
    if (this.props.id === undefined) {
      return this.renderGenerateArea()
    }

    const {id, tree, parentId} = this.props
    let childIds = tree[id].childIds
    let counter = tree[id].counter

    // css Style
    let aStyle = {
      marginLeft: 10,
      textAlign: 'center',
      textDecoration: 'none',
      color: '#a5a5a5'
    }
    let foldStyle = {
      color: (this.state.show && childIds.length) ? '#a5a5a5' : '#000',
      cursor: childIds.length ? 'pointer' : 'default'
    }
    let ulStyle = {
      margin: 0,
      listStyle: 'none',
      display: this.state.show ? 'block' : 'none'
    }

    // DOM
    let idArea = (<strong onClick={this.foldClick} style={foldStyle}>{id}</strong>)
    let incrementButton = (<a href="#" onClick={this.incrementClick} style={{textDecoration: 'none'}}>({counter})</a>)
    let addButton = (<a href="#" onClick={this.addChildClick} style={aStyle}>+</a>)
    let removeButton = typeof parentId !== undefined ? (
      <a href="#" onClick={this.removeChildClick} style={aStyle}>x</a>) : null
    let childNodes = childIds.map(this.renderChildNode)

    return (
      <div className="node">
        <div className="info" style={{paddingTop: '10, 0'}}>
          {idArea} --- {incrementButton}
          {addButton}
          {removeButton}
        </div>
        <ul className="childNode" style={ulStyle}>
          {childNodes}
        </ul>
      </div>
    )
  }
}

export default Node