import React, {Component, PropTypes} from 'react'

import * as syncActions from '../actions/syncActions'
import * as asyncActions from '../actions/asyncActions'

import Picker from '../components/Picker'
import List from '../components/List'

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,

    selected: PropTypes.string.isRequired,
    contexts: PropTypes.array.isRequired,
    lastUpdated: PropTypes.string.isRequired,

    isFetching: PropTypes.bool.isRequired,
    refresh: PropTypes.bool.isRequired
  }

  componentDidMount() {
    const {dispatch, selected} = this.props

    dispatch(asyncActions.fetchIfNeed(selected))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      const {dispatch, selected} = nextProps

      dispatch(asyncActions.fetchIfNeed(selected))
    }
  }

  handlerOnChange = theme => {
    const {dispatch} = this.props

    dispatch(syncActions.select(theme))
  }

  handlerOnRefreshClick = e => {
    e.preventDefault()

    const {dispatch, selected} = this.props

    dispatch(syncActions.refresh(selected))

    dispatch(asyncActions.fetchIfNeed(selected))
  }

  render() {
    const {selected, contexts, isFetching, lastUpdated} = this.props

    let lastUpdatedNode = !lastUpdated.length ? null :
      (<span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.</span>)

    let refreshNode = isFetching ? null :
      (<a href="#" onClick={this.handlerOnRefreshClick}>Refresh</a>)

    let listNode = contexts.length === 0 ?
      (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>) :
      (
        <div style={{opacity: isFetching ? 0.5 : 1}}>
          <List contexts={contexts}/>
        </div>
      )

    return (
      <div>
        <Picker current={selected} options={[ 'facebook', 'javascript' ]} onChange={this.handlerOnChange}/>

        <p>{lastUpdatedNode} {refreshNode}</p>

        {listNode}
      </div>
    )
  }
}

export default App