// @flow

import React, {PropTypes}from 'react'
import type {Id, Text} from '../types'

export type Props = {
  id: Id,
  text: Text,
  completed: boolean,
  onClick: () => void
}

const Item = ({id, text, completed, onClick}: Props) => (
  <li
    style={{
      textDecoration: completed ? 'line-through' : 'none',
      color: completed ? '#a5a5a5' : '#000'
    }}
    onClick={e => {
      e.preventDefault()
      onClick(id)
    }}
  >
    {text}
  </li>
)

Item.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Item