import React, {Component, PropTypes} from 'react'

class Add extends Component {
  constructor(props, context) {
    super(props, context)

    this.handlerOnSubmit = this.handlerOnSubmit.bind(this)
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  handlerOnSubmit(e) {
    e.preventDefault()

    let {onSubmit} = this.props
    let input = this.refs.addInput

    if (!input.value.trim().length) {
      return true
    }
    else {
      onSubmit(input.value)
      input.value = ''
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handlerOnSubmit}>
          <input ref="addInput"/>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default Add