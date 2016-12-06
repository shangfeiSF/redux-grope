import React from 'react'
import {render} from 'react-dom'

import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import RootContainer from './routes/RootContainer'
import createStore from './store/createStore'

const store = createStore()
const history = syncHistoryWithStore(browserHistory, store)

const root = document.getElementById('example')
var content = (<RootContainer store={store} history={history}/>)

render(content, root)