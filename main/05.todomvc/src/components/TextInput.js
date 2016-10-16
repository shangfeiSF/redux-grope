import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

class TextInput extends Component {
  static propTypes = {
    model: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    text: PropTypes.string,
  }

  state = {
    text: this.props.text || ''
  }

  handlerOnBlur = e => {
    if (this.props.model !== 'add') {
      this.props.onSave(e.target.value)
    }
  }

  handlerOnChange = e => {
    this.setState({
      text: e.target.value
    })
  }

  handlerOnKeyDown = e => {
    if (e.which === 13) {
      this.props.onSave(e.target.value.trim())

      this.props.model === 'add' && this.setState({
        text: ''
      })
    }
  }

  render() {
    return (
      <input
        className={
          classnames({
            'edit': this.props.model !== 'add',
            'new-todo': this.props.model === 'add'
          })
        }
        type="text"
        autoFocus="true"

        placeholder={this.props.placeholder}
        value={this.state.text}

        onBlur={this.handlerOnBlur}
        onChange={this.handlerOnChange}
        onKeyDown={this.handlerOnKeyDown}/>
    )
  }
}

export default TextInput