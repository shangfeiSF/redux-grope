import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'

import {Provider} from 'react-redux'

import AppContainer from './containers/AppContainer'

import configureStore from './store/configureStore'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)

const root = document.getElementById('example')
var content = (
  <Provider store={store}>
    <AppContainer/>
  </Provider>
)

render(content, root)