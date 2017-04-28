import React from 'react'
import {render} from 'react-dom'

import Immutable from 'immutable'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import RootContainer from './routes/RootContainer'
import createStore from './store/createStore'

const initialState = Immutable.Map({})

const store = createStore(initialState)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState (state) {
    return state.get('routing').toJS()
  }
})

const root = document.getElementById('example')
var content = (<RootContainer store={store} history={history}/>)

render(content, root)