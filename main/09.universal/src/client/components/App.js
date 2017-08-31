import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Counter from './Counter'

class App extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,

    syncActions: PropTypes.object.isRequired,
    thunkActions: PropTypes.object.isRequired,
  }

  render() {
    const {counter} = this.props

    const {syncActions, thunkActions} = this.props

    return (
      <div>
        <Counter
          counter={counter}
          syncActions={syncActions} thunkActions={thunkActions}
        />
      </div>
    )
  }
}

export default App