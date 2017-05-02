import {connect} from 'react-redux'

import Filter from '../components/Filter'

import {filter} from '../actions'

/*
 * 容器组件和展示组件的配合方式-2：
 * 展示组件拥有自己的原始props属性
 * 容器组件加工展示组件的原始props属性，返回新的props属性
 * 容器组件不是直接传递action创建方法，而是封装了dispatch()
 * */

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.filter
})

// https://github.com/reactjs/react-redux/blob/master/docs/api.md#arguments
// 使用filter的两种方式
const _mapDispatchToProps = ({
  onClick: filter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(filter(ownProps.filter))
  }
})

export default connect(
  mapStateToProps,
  // _mapDispatchToProps
  mapDispatchToProps
)(Filter)