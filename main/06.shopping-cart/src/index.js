import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import AppContainer from './containers/AppContainer'
import reducers from './reducers'
import {getAllProducts} from './actions'

/*
 * Q: What's a thunk?
 * A: A thunk is a function that wraps an expression to delay or modify its evaluation.
 * */
/*
 * Q: What's the motivation of redux-thunk(https://github.com/gaearon/redux-thunk)?
 * A: Redux Thunk middleware allows you to write action creators that return a function instead of an action.
 *     The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
 *     The inner function receives the store methods dispatch and getState as parameters.
 * */
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

/*
 * 使用包含自定义功能的 middleware 来扩展 Redux 是一种推荐的方式。
 * 多个 middleware 可以被组合到一起使用，形成 middleware 链。
 * 每个 middleware 接受 Store 的 dispatch 和 getState 函数作为命名参数，并返回一个函数。
 * redux middlewares 提供位于 action 被发起之后，到达 reducer 之前的扩展时间点。
 * */
const middleware = [thunk]
process.env.NODE_ENV !== 'production' && middleware.push(createLogger())

const store = createStore(reducers, applyMiddleware(...middleware))

store.dispatch(getAllProducts())

const root = document.getElementById('example')
var content = (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

render(content, root)