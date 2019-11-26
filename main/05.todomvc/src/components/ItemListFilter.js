/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import * as FilterTypes from '../constants/FilterTypes';

const FILTER_TITLES = {
    [FilterTypes.SHOW_ALL]: 'All',
    [FilterTypes.SHOW_ACTIVE]: 'Active',
    [FilterTypes.SHOW_COMPLETED]: 'Completed'
};

class ItemListFilter extends Component {
    static propTypes = {
        completedCount: PropTypes.number.isRequired,
        activeCount: PropTypes.number.isRequired,
        selectedFilter: PropTypes.string.isRequired,
        onClearCompleted: PropTypes.func.isRequired,
        onShow: PropTypes.func.isRequired
    }

    renderCount = () => (
        <span className="todo-count">
            <strong>{this.props.activeCount || 'No'}</strong>
            {this.props.activeCount === 1 ? ' item' : ' items'} left
        </span>
    )

    renderFilterLink = filter => {
        const title = FILTER_TITLES[filter];
        const style = {cursor: 'pointer'};

        return (
            <a
                className={
                    classnames({
                        selected: filter === this.props.selectedFilter
                    })
                }
                style={style}
                onClick={() => this.props.onShow(filter)}
            >
                {title}
            </a>
        )
    }

    renderClearButton = () => this.props.completedCount > 0
        ? (
            <button
                className="clear-completed"
                onClick={this.props.onClearCompleted}
            >
                Clear completed
            </button>
        )
        : null

    render() {
        return (
            <footer className="footer">
                {this.renderCount()}

                <ul className="filters">
                    {
                        [FilterTypes.SHOW_ALL, FilterTypes.SHOW_ACTIVE, FilterTypes.SHOW_COMPLETED].map(
                            filter => (
                                <li key={filter}>
                                    {this.renderFilterLink(filter)}
                                </li>
                            )
                        )
                    }
                </ul>

                {this.renderClearButton()}
            </footer>
        );
    }
}

export default ItemListFilter;
