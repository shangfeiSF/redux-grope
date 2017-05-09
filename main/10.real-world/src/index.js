import React from 'react'
import {render} from 'react-dom'

import Sparker from './sparker'
import createStore from './sparker/createStore'
import createHistory from './sparker/createHistory'

import routes from './routes'
import reducers from './reducers'
import thunk from 'redux-thunk'
import github from './middlewares/github'

const store = createStore({
  initState: {},
  reducers: reducers,
  middlewares: [thunk, github]
})
const history = createHistory(store)

const root = document.getElementById('example')
var content = <Sparker routes={routes} store={store} history={history}/>

render(content, root)