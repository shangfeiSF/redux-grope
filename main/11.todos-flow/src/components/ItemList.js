// @flow

import React, {Component, PropTypes} from 'react'
import type {Id, Items} from '../types'

import Item from './Item'

export type Props = {
  items: Items,
  onItemClick: (id: Id) => void
}

class ItemList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onItemClick: PropTypes.func.isRequired
  }

  render() {
    let {items, onItemClick}:Props = this.props

    return (
      <div>
        <h3>ItemsList</h3>

        <ul>
          {
            items.map(item =>
              <Item key={item.id} {...item} onClick={onItemClick}/>
            )
          }
        </ul>
      </div>
    )
  }
}

export default ItemList