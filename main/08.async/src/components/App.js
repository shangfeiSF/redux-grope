import React, {Component, PropTypes} from 'react'

import Themes from '../constants/Themes'

import * as syncActions from '../actions/syncActions'
import * as asyncActions from '../actions/asyncActions'

import Picker from '../components/Picker'
import List from '../components/List'

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      themes: Themes
    }
  }

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
    const {dispatch, selected} = nextProps

    let themes = this.state.themes

    if (themes.indexOf(selected) < 0) {
      this.setState({
        themes: [...themes, selected]
      })
    }

    if (nextProps.selected !== this.props.selected) {
      dispatch(asyncActions.fetchIfNeed(selected))
    }
  }

  handlerOnChange = theme => {
    const {dispatch} = this.props

    this.refs.appointedTheme.value = ''

    dispatch(syncActions.select(theme))
  }

  handlerAppointedTheme = (e) => {
    e.preventDefault()

    const {dispatch} = this.props
    const theme = this.refs.appointedTheme.value

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
        <Picker current={selected} options={this.state.themes} onChange={this.handlerOnChange}/>

        <p>
          <input type="text" ref="appointedTheme"/>
          <button onClick={this.handlerAppointedTheme} style={{marginLeft: 10}}>Fetch</button>
        </p>

        <p>{lastUpdatedNode} {refreshNode}</p>

        {listNode}
      </div>
    )
  }
}

export default App