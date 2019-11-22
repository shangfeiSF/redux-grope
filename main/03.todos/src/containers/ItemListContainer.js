/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {connect} from 'react-redux';

import ItemList from '../components/ItemList';

import {toggle} from '../actions';

const FILTERS = [
    {FILTER: 'SHOW_ALL'},
    {FILTER: 'SHOW_ACTIVE'},
    {FILTER: 'SHOW_COMPLETED'}
];

const filterHandler = (addAndToggle, filter) => {
    switch (filter) {
        case FILTERS[0].FILTER:
            return addAndToggle;

        case FILTERS[1].FILTER:
            return addAndToggle.filter(item => !item.completed);

        case FILTERS[2].FILTER:
            return addAndToggle.filter(item => item.completed);

        default:
            throw new Error('Unknown the filter: ' + filter);
    }
}

/*
 * 容器组件和展示组件的配合方式-3：
 * 容器组件根据Redux state中的数据为展示组件新添props属性
 * 容器组件向展示组件传递了toggle方法（命名为onItemClick）
 * */

// 纯函数声明哪些全局state字段是组件需要通过props获取的, 而且可以综合若干字段进行处理
const mapStateToProps = state => ({
    items: filterHandler(state.addAndToggle, state.filter)
})

// 纯函数声明哪些action创建函数是组件需要通过props获取的，并分配props中指定的key上
const mapDispatchToProps = {onItemClick: toggle};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
