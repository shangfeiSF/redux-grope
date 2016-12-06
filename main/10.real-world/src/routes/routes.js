import React from 'react'
import {Route} from 'react-router'

import AppContainer from '../containers/AppContainer'
import UserPageContainer from '../containers/UserPageContainer'
import RepoPageContainer from '../containers/RepoPageContainer'

const routes = (
  <Route path="/" component={AppContainer}>
    <Route path="/:login" component={UserPageContainer}/>
    <Route path="/:login/:name" component={RepoPageContainer}/>
  </Route>
)

export default routes