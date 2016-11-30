import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'

import {Provider} from 'react-redux'

import constants from '../asset/constants'
import AppContainer from './containers/AppContainer'
import createStore from './store/createStore'

const store = createStore(window[constants.globalProp])

const root = document.getElementById(constants.id)
var content = (
  <Provider store={store}>
    <AppContainer/>
  </Provider>
)

render(content, root)