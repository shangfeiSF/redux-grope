import React, {Component} from 'react'
import PropTypes from 'prop-types'

class List extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    renderItems: PropTypes.func.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired,
    loadingLabel: PropTypes.string.isRequired,

    pageCount: PropTypes.number,
    isFetching: PropTypes.bool.isRequired,
    nextPageUrl: PropTypes.string
  }

  static defaultProps = {
    loadingLabel: 'Loading...',
    isFetching: true
  }

  renderItems() {
    const {items, renderItems} = this.props

    return items.map(renderItems)
  }

  renderLoadMore() {
    const {onLoadMoreClick, pageCount, isFetching, nextPageUrl} = this.props

    return pageCount > 0 && nextPageUrl ? (
        <button
          style={{ fontSize: '150%' }}
          onClick={onLoadMoreClick}
          disabled={isFetching}
        >
          {isFetching ? 'Loading...' : 'Load More'}
        </button>
      ) : null
  }

  render() {
    const {items, loadingLabel, isFetching, nextPageUrl} = this.props

    const isEmpty = items.length === 0

    if (isEmpty && isFetching) {
      return <h2><i>{loadingLabel}</i></h2>
    }

    if (isEmpty && !nextPageUrl) {
      return <h1><i>Nothing here!</i></h1>
    }

    return (
      <div style={{marginTop: 10}}>
        {this.renderItems()}
        {this.renderLoadMore()}
      </div>
    )
  }
}

export default List