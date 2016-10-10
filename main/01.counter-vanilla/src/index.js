import {createStore} from 'redux'

import '../../global.css'

class App {
  constructor() {
    this.nodes = {}

    this.types = {
      in: 'INCREMENT',
      de: 'DECREMENT'
    }

    this.store = null
  }

  reducers(state, action) {
    if (typeof state === 'undefined') {
      return 0
    }

    switch (action.type) {
      case this.types.in:
        return state + 1
      case this.types.de:
        return state - 1
      default:
        return state
    }
  }

  boot() {
    let self = this
    let nodes = this.nodes

    let $ = function (id) {
      return document.getElementById(id)
    }

    nodes.times = $('times')
    nodes.increase = $('increase')
    nodes.decrease = $('decrease')
    nodes.increaseIfOdd = $('increaseIfOdd')
    nodes.increaseAsync = $('increaseAsync')

    /*
     * Redux createStore with reducers
     * and subscribe the dispatch actions
     * */
    this.store = createStore(self.reducers.bind(self))
    this.store.subscribe(function () {
      self.render()
    })
  }

  render() {
    let nodes = this.nodes
    let store = this.store

    nodes.times.innerHTML = store.getState().toString()
  }

  bind() {
    let self = this
    let nodes = this.nodes
    let store = this.store

    let $ = function (node, type, listener) {
      node.addEventListener(type, listener)
    }

    $(nodes.increase, 'click', function () {
      store.dispatch({
        type: self.types.in
      })
    })

    $(nodes.decrease, 'click', function () {
      store.dispatch({
        type: self.types.de
      })
    })

    $(nodes.increaseIfOdd, 'click', function () {
      if (store.getState() % 2 !== 0) {
        store.dispatch({
          type: self.types.in
        })
      }
    })

    $(nodes.increaseAsync, 'click', function () {
      setTimeout(function () {
        store.dispatch({
          type: self.types.in
        })
      }, 1000)
    })
  }

  init() {
    this.boot()
    this.render()
    this.bind()
  }
}

new App().init()