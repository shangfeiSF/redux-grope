/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import {TEXT_INPUT_MODEL} from '../constants/TextInputModel';
import TextInput from './TextInput';

class Item extends Component {
    static propTypes = {
        todo: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    }

    // This is a state just maintained by Item.
    state = {editing: false}

    handlerOnSave = text => {
        text.length === 0
            ? this.props.actions._delete_(this.props.todo.id)
            : this.props.actions._edit_(this.props.todo.id, text);

        this.setState({editing: false});
    }

    handlerOnDoubleClick = () => {
        this.setState({editing: true}, () => {
            console.log('state in callback: ', this.state);
        });
        console.warn('state: ', this.state);
    }

    render() {
        const element = this.state.editing
            ? (
                <TextInput
                    text={this.props.todo.text}
                    model={TEXT_INPUT_MODEL.EDIT}
                    placeholder=""
                    onSave={this.handlerOnSave}
                />
            )
            : (
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={this.props.todo.completed}
                        onChange={() => this.props.actions._complete_(this.props.todo.id)}
                    />

                    <label
                        onDoubleClick={this.handlerOnDoubleClick}
                    >
                        {this.props.todo.text}
                    </label>

                    <button
                        className="destroy"
                        onClick={() => this.props.actions._delete_(this.props.todo.id)}/>
                </div>
            );

        return (
            <li
                className={
                    classnames({
                        completed: this.props.todo.completed,
                        editing: this.state.editing
                    })
                }
            >
                {element}
            </li>
        );
    }
}

export default Item;
