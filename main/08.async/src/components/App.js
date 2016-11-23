import React, {Component, PropTypes} from 'react'

import Picker from '../components/Picker'
import Refresh from '../components/Refresh'
import List from '../components/List'

class App extends Component {
  static propTypes = {
    themes: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,

    contexts: PropTypes.array.isRequired,
    lastUpdated: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isRefresh: PropTypes.bool.isRequired,

    asyncActions: PropTypes.object.isRequired,
    syncActions: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.asyncActions.fetchIfNeed(this.props.selected)
  }

  render() {
    const {themes, selected} = this.props

    const {contexts, lastUpdated, isFetching} = this.props

    const {asyncActions, syncActions} = this.props

    return (
      <div>
        <Picker
          themes={themes} selected={selected}
          asyncActions={asyncActions} syncActions={syncActions}
        />

        <Refresh
          selected={selected} lastUpdated={lastUpdated} isFetching={isFetching}
          asyncActions={asyncActions} syncActions={syncActions}
        />

        <List
          isFetching={isFetching} contexts={contexts}
        />
      </div>
    )
  }
}

export default App