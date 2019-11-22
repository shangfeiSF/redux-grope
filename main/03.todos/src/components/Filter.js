/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        active: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired
    }

    handlerOnClick = event => {
        event.preventDefault();

        this.props.onClick();
    }

    render() {
        let {active, children} = this.props;
        let block = active
            ? (<span>{children}</span>)
            : (<a href="#" onClick={this.handlerOnClick}>{children}</a>);
        return block;
    }
}

export default Filter;
