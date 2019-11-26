/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import {TEXT_INPUT_MODEL} from '../constants/TextInputModel';

const defaultText = '';

class TextInput extends Component {
    static propTypes = {
        text: PropTypes.string,
        model: PropTypes.string,
        placeholder: PropTypes.string,
        onSave: PropTypes.func.isRequired
    }

    state = {text: this.props.text || defaultText}

    handlerOnBlur = event => this.props.model !== TEXT_INPUT_MODEL.ADD && this.props.onSave(event.target.value.trim())

    handlerOnChange = event => {
        this.setState({text: event.target.value.trim()}, () => {
            console.log('state in callback: ', this.state);
        });
        console.warn('state: ', this.state);
    }

    handlerOnKeyDown = event => {
        if (event.which === 13) {
            this.props.onSave(event.target.value.trim());
            this.props.model === TEXT_INPUT_MODEL.ADD && this.setState({text: defaultText});
        }
    }

    render() {
        const isAdd = this.props.model === TEXT_INPUT_MODEL.ADD;

        return (
            <input
                className={
                    classnames({
                        'edit': !isAdd,
                        'new-todo': isAdd
                    })
                }
                type="text"
                autoFocus="true"

                placeholder={this.props.placeholder}
                value={this.state.text}

                onBlur={this.handlerOnBlur}
                onChange={this.handlerOnChange}
                onKeyDown={this.handlerOnKeyDown}
            />
        );
    }
}

export default TextInput;
