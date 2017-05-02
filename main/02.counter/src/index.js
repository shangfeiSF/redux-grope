import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'

import Counter from './components/Counter'
import reducers from './reducers'

import '../../global.css'

class App {
  constructor() {
    this.root = document.getElementById('example')

    this.store = createStore(reducers)
    this.store.subscribe(this.render.bind(this))
  }

  render() {
    let store = this.store

    let content =
      <Counter
        value={ store.getState() }
        handlerOnIncrease={ () => store.dispatch({type: 'INCREMENT'}) }
        handlerOnDecrease={ () => store.dispatch({type: 'DECREMENT'}) }
      />

    render(content, this.root)
  }

  init() {
    this.render()
  }
}

new App().init()