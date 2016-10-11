import React, {Component, PropTypes} from 'react'

import Todo from './Todo'

class TodoList extends Component {
  constructor(props, context) {
    super(props, context)
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
  }

  render() {
    let {todos, onTodoClick} = this.props

    return (
      <ul>
        {todos.map(todo =>
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => onTodoClick(todo.id)}
          />
        )}
      </ul>
    )
  }
}

export default TodoList