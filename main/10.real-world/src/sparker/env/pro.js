import React, {Component, PropTypes} from 'react'

import {Router} from 'react-router'
import {Provider} from 'react-redux'

class Sparker extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    let {store, routes, history} = this.props

    return (
      <Provider store={store}>
        <Router history={history} routes={routes}/>
      </Provider>
    )
  }
}

export default Sparker