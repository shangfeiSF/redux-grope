/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Item extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
    }

    handlerOnClick = event => {
        event.preventDefault();
        this.props.onClick(this.props.id);
    }

    render() {
        const style = {
            textDecoration: this.props.completed ? 'line-through' : 'none',
            color: this.props.completed ? '#a5a5a5' : '#000'
        };

        return (
            <li style={style} onClick={this.handlerOnClick}>{this.props.text}</li>
        );
    }
}

export default Item;