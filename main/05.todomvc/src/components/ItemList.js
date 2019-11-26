/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Item from './Item';
import ItemListFilter from './ItemListFilter';

import * as FilterTypes from '../constants/FilterTypes';

const FilterHandlers = {
    [FilterTypes.SHOW_ALL]: () => true,
    [FilterTypes.SHOW_ACTIVE]: item => !item.completed,
    [FilterTypes.SHOW_COMPLETED]: item => item.completed
};

class ItemList extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    }

    // This is a state just maintained by ItemList.
    state = {filter: FilterTypes.SHOW_ALL}

    handleOnShow = filter => {
        this.setState({filter}, () => {
            console.log('state in callback: ', this.state);
        });
        console.warn('state: ', this.state);
    }

    renderToggleAll = completedCount => this.props.todos.length > 0
        ? (
            <div>
                <input
                    type="checkbox"
                    checked={completedCount === this.props.todos.length}
                    onChange={this.props.actions._completeAll_}
                />
                <label>Toggle All</label>
            </div>
        )
        : null

    renderItemListFilter = completedCount => this.props.todos.length > 0
        ? (
            <ItemListFilter
                completedCount={completedCount}
                activeCount={this.props.todos.length - completedCount}
                selectedFilter={this.state.filter}
                onClearCompleted={this.props.actions._clearCompleted_}
                onShow={this.handleOnShow}
            />
        )
        : null

    render() {
        const filteredTodos = this.props.todos.filter(FilterHandlers[this.state.filter]);
        const completedCount = this.props.todos.reduce(
            (count, item) => item.completed ? count + 1 : count,
            0
        );

        return (
            <section className="main">
                {this.renderToggleAll(completedCount)}

                <ul className="todo-list">
                    {
                        filteredTodos.map(
                            item => <Item key={item.id} todo={item} actions={this.props.actions}/>
                        )
                    }
                </ul>

                {this.renderItemListFilter(completedCount)}
            </section>
        );
    }
};

export default ItemList;
