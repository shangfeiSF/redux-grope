import React, {Component, PropTypes} from 'react'

import Item from './Item'

class ItemList extends Component {
  constructor(props, context) {
    super(props, context)
  }

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onItemClick: PropTypes.func.isRequired
  }

  render() {
    let {items, onItemClick} = this.props

    return (
      <div>
        <h3>ItemsList</h3>

        <ul>
          {items.map(item =>
            <Item
              key={item.id}
              {...item}
              onClick={() => onItemClick(item.id)}
            />
          )}
        </ul>
      </div>
    )
  }
}

export default ItemList