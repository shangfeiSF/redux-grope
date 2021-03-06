import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,

    syncActions: PropTypes.object.isRequired,
    thunkActions: PropTypes.object.isRequired,
  }

  render() {
    let {counter} = this.props

    let {increase, decrease} = this.props.syncActions
    let {increaseIfOdd, increameAsync} = this.props.thunkActions

    return (
      <div>
        <h2>Clicked: {counter} times</h2>

        <div>
          <p>
            <button onClick={increase}>Increase</button>
          </p>
          <p>
            <button onClick={decrease}>Decrease</button>
          </p>
        </div>

        <div>
          <p>
            <button onClick={increaseIfOdd}>Increase if odd</button>
          </p>
          <p>
            <button onClick={increameAsync}>Increase async</button>
          </p>
        </div>
      </div>
    )
  }
}

export default Counter
