import {connect} from 'react-redux'
/* 容器组件FilterLink中调用展示组件Link */
import Link from '../components/Link'
/* 容器组件中使用Redux必然会出现dispatch和action */
import {filter} from '../actions'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.filter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(filter(ownProps.filter))
  }
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink