import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from '../components/App'
import HomePageContainer from '../containers/HomePageContainer'
import ResultPageContainer from '../containers/ResultPageContainer'

const nameSpace = '/12.immutable'

const routes = (
  <Route path={`${nameSpace}`} component={App}>
    <IndexRoute component={HomePageContainer}/>
    <Route path={`${nameSpace}/result/:userId`} component={ResultPageContainer}/>
  </Route>
)

export default routes