import React, {PropTypes, Component} from 'react'
import TextInput from './TextInput'

class Header extends Component {
  static propTypes = {
    add: PropTypes.func.isRequired
  }

  handlerOnSave = (text) => {
    if (text.length !== 0) {
      this.props.add(text)
    }
  }

  render() {
    let style = {textAlign: 'center'}
    return (
      <header className="header">
        <h1 style={style}>Todos App</h1>
        <TextInput
          model="add"
          placeholder="What needs to be done?"
          onSave={this.handlerOnSave}
        />
      </header>
    )
  }
}

export default Header