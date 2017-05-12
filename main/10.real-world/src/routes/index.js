import React from 'react'
import {Route} from 'react-router'

import AppContainer from '../containers/AppContainer'
import UserPageContainer from '../containers/UserPageContainer'
import RepoPageContainer from '../containers/RepoPageContainer'

const nameSpace = '/10.real-world'

const routes = (
  <Route path={`${nameSpace}/`} component={AppContainer}>
    <Route path={`${nameSpace}/:login`} component={UserPageContainer}/>
    <Route path={`${nameSpace}/:login/:name`} component={RepoPageContainer}/>
  </Route>
)

export default routes