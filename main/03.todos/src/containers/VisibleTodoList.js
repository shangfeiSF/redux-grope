import {connect} from 'react-redux'
import TodoList from '../components/TodoList'

import {toggle} from '../actions'

const getVisibleTodos = (addAndToggle, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return addAndToggle
    case 'SHOW_COMPLETED':
      return addAndToggle.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return addAndToggle.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.addAndToggle, state.filter)
})

const mapDispatchToProps = ({
  onTodoClick: toggle
})

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
