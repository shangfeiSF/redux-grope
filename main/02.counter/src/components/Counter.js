import React, {Component, PropTypes} from 'react'

class Counter extends Component {
  constructor(props, context) {
    super(props, context)

    this.handlerOnIncreaseIfOdd = this.handlerOnIncreaseIfOdd.bind(this)
    this.handlerOnIncreaseAsync = this.handlerOnIncreaseAsync.bind(this)
  }

  static propTypes = {
    value: PropTypes.number.isRequired,
    handlerOnIncrease: PropTypes.func.isRequired,
    handlerOnDecrease: PropTypes.func.isRequired
  }

  handlerOnIncreaseIfOdd() {
    if (this.props.value % 2 !== 0) {
      this.props.handlerOnIncrease()
    }
  }

  handlerOnIncreaseAsync() {
    setTimeout(this.props.handlerOnIncrease, 1000)
  }

  render() {
    const {value, handlerOnIncrease, handlerOnDecrease} = this.props

    return (
      <div>
        <h3>
          Clicked: {value} times
        </h3>
        <div>
          <p>
            <button onClick={handlerOnIncrease}>+</button>
            <button onClick={handlerOnDecrease}>-</button>
          </p>
          <p>
            <button onClick={this.handlerOnIncreaseIfOdd}>Increase if odd</button>
            <button onClick={this.handlerOnIncreaseAsync}>Increase async</button>
          </p>
        </div>
      </div>
    )
  }
}

export default Counter