import React, {Component, PropTypes} from 'react'

class List extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    contexts: PropTypes.array.isRequired
  }

  render() {
    const {isFetching, contexts} = this.props

    let listNode = contexts.length === 0 ?
      (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>) :
      (
        <div style={{opacity: isFetching ? 0.3 : 1}}>
          <ul>
            {
              contexts.map((context, index) => <li key={index} style={{fontSize: 20}}>{context.title}</li>)
            }
          </ul>
        </div>
      )

    return listNode
  }
}

export default List