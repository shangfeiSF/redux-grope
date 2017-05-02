import {connect} from 'react-redux'

import Add from '../components/Add'

import {add} from '../actions'

/*
 * 容器组件和展示组件的配合方式-1：
 * 容器组件传递action创建方法，展示组件生成输入，展示组件调用action创建方法
 * 容器组件向展示组件传递了add方法（命名为onSubmit）
 * */

const mapStateToProps = null

const mapDispatchToProps = ({
  onSubmit: add
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add)