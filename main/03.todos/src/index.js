import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import App from './components/App'
import reducers from './reducers'

import '../../global.css'

const store = createStore(reducers)
const root = document.getElementById('example')
var content = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(content, root)