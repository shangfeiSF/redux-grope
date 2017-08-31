// @flow

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import type {Id, Text, Event} from '../types'

export type Props = {
  id: Id,
  text: Text,
  completed: boolean,
  onClick: (id: Id) => void
}

class Item extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  }

  handlerOnClick = (e: Event) => {
    e.preventDefault()

    let {id, onClick}:Props = this.props

    onClick(id)
  }

  render() {
    let {completed, text}:Props = this.props
    let style = {
      textDecoration: completed ? 'line-through' : 'none',
      color: completed ? '#a5a5a5' : '#000'
    }

    return (
      <li style={style} onClick={this.handlerOnClick}>{text}</li>
    )
  }
}

export default Item