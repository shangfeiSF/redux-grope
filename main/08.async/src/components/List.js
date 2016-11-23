import React, {Component, PropTypes} from 'react'

class List extends Component {
  static propTypes = {
    selected: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    contexts: PropTypes.array.isRequired
  }

  mark(context, index) {
    const {selected} = this.props

    const keyword = selected.toLowerCase()
    const len = keyword.length

    let nodes = []

    let original = context.title
    let search = original.toLowerCase()

    let begin = search.indexOf(keyword)

    while (begin > -1) {
      let end = begin + len

      nodes.push(original.slice(0, begin))
      nodes.push(
        <strong key={`${index}-${begin}`} style={{backgroundColor: 'yellow'}}>{original.slice(begin, end)}</strong>
      )

      search = search.slice(end)
      original = original.slice(end)

      begin = search.indexOf(keyword)
    }

    original.length && nodes.push(original)

    return nodes
  }

  render() {
    const {isFetching, contexts} = this.props

    let listNode = contexts.length === 0 ?
      (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>) :
      (
        <div style={{opacity: isFetching ? 0.3 : 1}}>
          <ul>
            {
              contexts.map((context, index) => {
                return (
                  <li key={index} style={{fontSize: 20}}>
                    {this.mark(context, index)}
                  </li>
                )
              })
            }
          </ul>
        </div>
      )

    return listNode
  }
}

export default List