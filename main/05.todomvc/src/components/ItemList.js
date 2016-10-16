import React, {Component, PropTypes} from 'react'

import Item from './Item'
import ItemListFilter from './ItemListFilter'

import * as FilterTypes from '../constants/FilterTypes'

// ES6允许字面量定义对象时，用表达式作为对象的属性名，即把表达式放在方括号内
const FilterHandlers = {
  [FilterTypes.SHOW_ALL]: () => true,
  [FilterTypes.SHOW_ACTIVE]: item => !item.completed,
  [FilterTypes.SHOW_COMPLETED]: item => item.completed
}

class ItemList extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    filter: FilterTypes.SHOW_ALL
  }

  handlerOnClearCompleted = () => {
    this.props.actions.clearCompletedActionCreater()
  }

  handleOnShow = filter => {
    this.setState({filter})
  }

  renderToggleAll(completedCount) {
    const {todos, actions} = this.props

    if (todos.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAllActionCreater}/>
      )
    }
  }

  renderItemListFilter(completedCount) {
    const {todos} = this.props
    const {filter} = this.state

    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <ItemListFilter
          completedCount={completedCount}
          activeCount={activeCount}
          selectedFilter={filter}
          onClearCompleted={this.handlerOnClearCompleted.bind(this)}
          onShow={this.handleOnShow.bind(this)}
        />
      )
    }
  }

  render() {
    let {todos, actions} = this.props
    let {filter} = this.state

    let filteredTodos = todos.filter(FilterHandlers[filter])
    let completedCount = todos.reduce(
      (count, item) => item.completed ? count + 1 : count,
      0
    )

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}

        <ul className="todo-list">
          {filteredTodos.map(item =>
            <Item key={item.id} todo={item} actions={actions}/>
          )}
        </ul>

        {this.renderItemListFilter(completedCount)}
      </section>
    )
  }
}

export default ItemList