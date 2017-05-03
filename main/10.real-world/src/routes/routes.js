import React from 'react'
import {Route} from 'react-router'

import AppContainer from '../containers/AppContainer'
import UserPageContainer from '../containers/UserPageContainer'
import RepoPageContainer from '../containers/RepoPageContainer'

const routes = (
  <Route path="/10.real-world/" component={AppContainer}>
    <Route path="/10.real-world/:login" component={UserPageContainer}>
      <Route path="/10.real-world/:login/:name" component={RepoPageContainer}/>
    </Route>
  </Route>
)

export default routes