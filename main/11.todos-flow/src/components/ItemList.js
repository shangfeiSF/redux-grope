// @flow

import React, {PropTypes}from 'react'
import type {Id, Todos} from '../types'
import Item from './Item'

export type Props = {
  items: Todos,
  onItemClick: (id: Id) => void
}

const ItemList = ({items, onItemClick}: Props) => (
  <div>
    <h3>ItemsList</h3>
    <ul>
      {items.map(item =>
        <Item
          key={item.id}
          {...item}
          onClick={onItemClick}
        />
      )}
    </ul>
  </div>
)

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onItemClick: PropTypes.func.isRequired
}

export default ItemList