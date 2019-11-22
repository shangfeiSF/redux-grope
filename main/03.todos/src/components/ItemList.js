/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

class ItemList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape(
                {
                    id: PropTypes.number.isRequired,
                    completed: PropTypes.bool.isRequired,
                    text: PropTypes.string.isRequired
                }
            ).isRequired
        ).isRequired,
        onItemClick: PropTypes.func.isRequired
    }

    render() {
        /*
         * 容器组件和展示组件的配合方式-3：
         * 展示组件封装了容器组件传递action创建方法，继续传递给其它展示组件
         * */
        return (
            <div>
                <h3>ItemsList</h3>
                <ul>
                    {this.props.items.map(item =>
                        <Item
                            key={item.id}
                            {...item}
                            onClick={this.props.onItemClick}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

export default ItemList;