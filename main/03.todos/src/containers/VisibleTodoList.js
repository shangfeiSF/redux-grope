import {connect} from 'react-redux'
/* 容器组件VisibleTodoList中调用展示组件TodoList */
import TodoList from '../components/TodoList'
/* 容器组件中使用Redux必然会出现dispatch和action */
import {toggle} from '../actions'

const filterHandler = (addAndToggle, filter) => {
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

// 纯函数声明哪些全局state字段是组件需要通过props获取的
// 而且可以综合若干字段进行处理
const mapStateToProps = (state) => ({
  todos: filterHandler(state.addAndToggle, state.filter)
})

// 纯函数声明哪些action创建函数是组件需要通过props获取的，并分配props中指定的key上
const mapDispatchToProps = ({
  onTodoClick: toggle // toggle创建函数分配到props.onTodoClick上
})

// react-redux的connect()方法将TodoList转换成容器组件
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
