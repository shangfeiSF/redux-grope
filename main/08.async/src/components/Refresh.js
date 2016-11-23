import React, {Component, PropTypes} from 'react'

class Refresh extends Component {
  static propTypes = {
    selected: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,

    asyncActions: PropTypes.object.isRequired,
    syncActions: PropTypes.object.isRequired
  }

  handlerOnClick = e => {
    e.preventDefault()

    const {selected, asyncActions, syncActions} = this.props

    syncActions.refresh(selected)
    asyncActions.fetchIfNeed(selected)
  }

  render() {
    const {lastUpdated, isFetching} = this.props

    let lastUpdatedNode = !lastUpdated.length ? null :
      (<span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.</span>)

    let refreshNode = isFetching ? null :
      (<a href="#" onClick={this.handlerOnClick}>Refresh</a>)

    return (
      <p>{lastUpdatedNode} {refreshNode}</p>
    )
  }
}

export default Refresh