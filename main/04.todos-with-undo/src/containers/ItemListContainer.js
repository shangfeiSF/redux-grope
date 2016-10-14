import {connect} from 'react-redux'

import ItemList from '../components/ItemList'

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

/*
 * 容器组件和展示组件的配合方式-3：
 * 容器组件根据Redux state中的数据为展示组件新添props属性
 * 容器组件向展示组件传递了toggle方法（命名为onItemClick）
 * */

// 纯函数声明哪些全局state字段是组件需要通过props获取的
// 而且可以综合若干字段进行处理
const mapStateToProps = (state) => ({
  // redux-undo 
  items: filterHandler(state.addAndToggle.present, state.filter)
})

// 纯函数声明哪些action创建函数是组件需要通过props获取的，并分配props中指定的key上
const mapDispatchToProps = ({
  onItemClick: toggle // toggle创建函数分配到props.onItemClick上
})

// react-redux的connect()方法将TodoList转换成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList)