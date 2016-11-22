import React, {Component, PropTypes} from 'react'

class List extends Component {
  static propTypes = {
    contexts: PropTypes.array.isRequired
  }

  render() {
    const {contexts} = this.props

    return (
      <ul>
        {
          contexts.map((context, i) => <li key={i}>{context.title}</li>)
        }
      </ul>
    )
  }
}

export default List