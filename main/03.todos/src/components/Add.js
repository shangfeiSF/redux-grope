/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Add extends Component {
    constructor(props, context) {
        super(props, context);
    }

    // The onSubmit prop is defined in AddContainer.
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }

    handlerOnSubmit = event => {
        event.preventDefault();

        const input = this.refs.addInput;
        if (input.value.trim().length !== 0) {
            this.props.onSubmit(input.value);
            input.value = '';
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handlerOnSubmit}>
                    <input ref="addInput"/>
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}

export default Add;
