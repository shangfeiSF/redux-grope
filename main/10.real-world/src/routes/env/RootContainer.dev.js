import DevTools from '../../uitls/DevTools'

import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router'

import routes from '../routes'

class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    let {store, history} = this.props

    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes}/>
          <DevTools />
        </div>
      </Provider>
    )
  }
}

export default Root