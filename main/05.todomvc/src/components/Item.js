import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import TextInput from './TextInput'

class Item extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    editing: false
  }

  handlerOnDoubleClick = () => {
    this.setState({
      editing: true
    })
  }

  handlerOnSave = (id, text) => {
    let {actions} = this.props

    if (text.length === 0) {
      actions.deleteActionCreater(id)
    }
    else {
      actions.editActionCreater(id, text)
    }

    this.setState({
      editing: false
    })
  }

  render() {
    const {todo, actions} = this.props

    let element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => actions.completeActionCreater(todo.id)}
        />

        <label
          onDoubleClick={this.handlerOnDoubleClick}
        >
          {todo.text}
        </label>

        <button
          className="destroy"
          onClick={() => actions.deleteActionCreater(todo.id)}/>
      </div>
    )

    if (this.state.editing) {
      element = (
        <TextInput
          model='edit'
          text={todo.text}
          onSave={(text) => this.handlerOnSave(todo.id, text)}
        />
      )
    }

    return (
      <li
        className={
          classnames({
            completed: todo.completed,
            editing: this.state.editing
          })
        }
      >
        {element}
      </li>
    )
  }
}

export default Item