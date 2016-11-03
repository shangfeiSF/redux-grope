import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'

import * as FilterTypes from '../constants/FilterTypes'

// ES6允许字面量定义对象时，用表达式作为对象的属性名，即把表达式放在方括号内
const FILTER_TITLES = {
  [FilterTypes.SHOW_ALL]: 'All',
  [FilterTypes.SHOW_ACTIVE]: 'Active',
  [FilterTypes.SHOW_COMPLETED]: 'Completed'
}

class ItemListFilter extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    selectedFilter: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired
  }

  renderCount() {
    const {activeCount} = this.props

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong>
        {activeCount === 1 ? ' item' : ' items'} left
      </span>
    )
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter]
    const {selectedFilter, onShow} = this.props
    const style = {cursor: 'pointer'}

    return (
      <a
        className={
          classnames({
            selected: filter === selectedFilter
          })
        }
        style={style}
        onClick={() => onShow(filter)}
      >
        {title}
      </a>
    )
  }

  renderClearButton() {
    const {completedCount, onClearCompleted} = this.props

    if (completedCount > 0) {
      return (
        <button
          className="clear-completed"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )
    }
  }

  render() {
    let filters = [
      FilterTypes.SHOW_ALL,
      FilterTypes.SHOW_ACTIVE,
      FilterTypes.SHOW_COMPLETED
    ]

    return (
      <footer className="footer">
        {this.renderCount()}

        <ul className="filters">
          {
            filters.map(filter =>
              <li key={filter}>
                {this.renderFilterLink(filter)}
              </li>
            )
          }
        </ul>

        {this.renderClearButton()}
      </footer>
    )
  }
}

export default ItemListFilter