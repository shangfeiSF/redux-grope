/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {TEXT_INPUT_MODEL} from '../constants/TextInputModel';
import TextInput from './TextInput';

class Header extends Component {
    static propTypes = {
        add: PropTypes.func.isRequired
    }

    handlerOnSave = text => text.length !== 0 && this.props.add(text)

    render() {
        const style = {textAlign: 'center'};
        return (
            <header className="header">
                <h1 style={style}>Todos App</h1>
                <TextInput
                    text=""
                    model={TEXT_INPUT_MODEL.ADD}
                    placeholder="What needs to be done?"
                    onSave={this.handlerOnSave}
                />
            </header>
        );
    }
}

export default Header;
