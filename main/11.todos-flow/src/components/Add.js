// @flow

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import type {Text, Event} from '../types'

export type Props = {
  onSubmit: (value: Text) => void
}

class Add extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  handlerOnSubmit = (e: Event) => {
    e.preventDefault()

    let {onSubmit}:Props = this.props
    let input = this.refs.addInput

    if (input.value.trim().length) {
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