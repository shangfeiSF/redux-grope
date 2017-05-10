import React, {Component, PropTypes} from 'react'

import {Router} from 'react-router'
import {Provider} from 'react-redux'

// import {DevTools, keyMaps} from '../devTools'

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
        <div className="app">
          {/*<div className="devTools">*/}
            {/*<p>Hide DevTools with {keyMaps.toggleVisibilityKey}.</p>*/}
            {/*<p>Change DevTools Position with {keyMaps.changePositionKey}</p>*/}
            {/*<DevTools />*/}
          {/*</div>*/}
          <Router history={history} routes={routes}/>
        </div>
      </Provider>
    )
  }
}

export default Sparker