/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {connect} from 'react-redux';

import Filter from '../components/Filter';

import {filter} from '../actions';

/*
 * 容器组件和展示组件的配合方式-2：
 * 展示组件拥有自己的原始props属性
 * 容器组件加工展示组件的原始props属性，返回新的props属性
 * 容器组件不是直接传递action创建方法，而是封装了dispatch()
 * */

const mapStateToProps = (state, ownProps) => ({
    active: state.filter === ownProps.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: dispatch(filter(ownProps.filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
