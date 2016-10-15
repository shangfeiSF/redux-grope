import React, {Component, PropTypes} from 'react'

import Header from './Header'
import ItemList from './ItemList'

class App extends Component {
  constructor(props, context) {
    super(props, context)
  }

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