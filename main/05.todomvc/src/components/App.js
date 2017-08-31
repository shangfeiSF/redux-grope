import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import ItemList from './ItemList'

class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  render() {
    let {todos, actions} = this.props

    return (
      <div>
        <Header add={actions.addActionCreater}/>
        <ItemList todos={todos} actions={actions}/>
      </div>
    )
  }
}

export default App