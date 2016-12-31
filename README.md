## 1. Installation

To install all the dependencies and devDependencies of redux-grope:

```
cd redux-grope

npm install -g webpack
npm install -g flow-bin
npm install -g flow-typed

npm install
```

## 2. The project structure

```
  ├─ bin/    Commands & Temporary files
  ├─ flow-typed/    Library Definitions for Flow to checking third-party code
  ├─ main/    Demos for learning how to use Redux
  ├─ node_modules/    All the dependencies and devDependencies
  ├─ server/   Local Sever & Vendors & Webpack configs
  ├─ tests/    Tests according to main/ with Flow
  ├─ .babelrc   config of Babel
  ├─ .flowconfig   config of Flow
  ├─ .gitignore
  ├─ .package.json
  └─ README.md
```

## 3. Learn how to use Redux to admin state in your applicatons

### 3.1 Bundle the vendors for applicatons in main first

You should execute `cd redux-grope` and `npm run dll`  or `node bin/dll`. It helps you to use [HappyPack](https://github.com/amireh/happypack) which makes webpack builds faster by allowing you to transform multiple files in parallel. Then there will be two new files (`manifest.json` & `vendorsBundle_<hash>.js`) created in `server/vendors/`. Once you add new dependencies in your applicaton, you need to execute `npm run dll`  or `node bin/dll`  to bundle your vendors again.

> **NOTE**

> If you want comapre with the efficiency of webpack without [HappyPack](https://github.com/amireh/happypack), you can use `server/unhappypack/webpack.raw.js`  instead of `server/webpack.config.js`

###  3.2 Start the local server to build and view applicatons in main

You should execute `cd redux-grope` and `npm run sp`  or `node bin/server -p`

####  Options about `node bin/server`

* `-hot <Boolean>` : Indicates whether to use react-hot-loader. `-h`  is the shortcut of `-hot true`.
* `-index <Number>` : Indicates which demo by sequence should be started. `-i` is its shortcut, e.g. `-i  02 -i 03`  will start `main/02.counter` & `main/03.todos`.
* `-quiet <Boolean>` : Indicates whether to make stdout of webpack be quited. `-q` is its shortcut.
* `-dev <Boolean>`  : Indicates whether to start with development mode. `-d`  is the shortcut of `-dev true`.
* `-pro <Boolean>` : Indicates whether to start with production mode. `-p`  is the shortcut of `-pro true`.

#### Also there is some npm-scripts that you can execute:

* `npm start` : the same to `node bin/server -h`
* `npm run si <nunber>` : the same to `node bin/server -h -i <number>`
* `npm run sp` : the same to `node bin/server -p`
* `npm run spi <number>` : the same to `node bin/server -p -i <number>`
* `npm run universal` : the same to `"node main/09.universal/server.js`

###  3.3 The description of applicatons in main

### `01.counter-vanilla:`

This is a simple example that does not only exclude any module to compose the application and also without any build system like [Webpack](http://webpack.github.io/) to bundle these modules, besides it does not import a MVC framework like [React](https://github.com/facebook/react). It just show how to use APIs of [Redux](https://github.com/reactjs/redux) to build application with ES6.

### `02.counter:`

This is the most basic example of using Redux together with React. For simplicity, it re-renders the React component manually when the store changes. In real projects, you will likely want to use the highly performant [React Redux](https://github.com/reactjs/react-redux) bindings instead.

### `03.todos:`

This is the best example to get a deeper understanding of how the state updates work together with components in Redux. It shows how reducers can delegate handling actions to other reducers, and how you can use [React Redux](https://github.com/reactjs/react-redux) to generate container components from your presentational components.

### `04.todos-with-undo:`

This is a variation on the previous example. It is almost identical, but additionally shows how wrapping your reducer with [Redux Undo](https://github.com/omnidan/redux-undo) lets you add a Undo/Redo functionality to your app with a few lines of code.

### `05.todomvc:`

This is the classical [TodoMVC](http://todomvc.com/) example. It's here for the sake of comparison, but it covers the same points as the Todos example.

### `06.shopping-cart:`

This example shows important idiomatic Redux patterns that become important as your app grows. In particular, it shows how to store entities in a normalized way by their IDs, how to compose reducers on several levels, and how to define selectors alongside the reducers so the knowledge about the state shape is encapsulated. It also demonstrates logging with [Redux Logger](https://github.com/fcomb/redux-logger) and conditional dispatching of actions with [Redux Thunk](https://github.com/gaearon/redux-thunk) middleware.

### `07.tree-view:`

This example demonstrates rendering a deeply nested tree view and representing its state in a normalized form so it is easy to update from reducers. Good rendering performance is achieved by the container components granularly subscribing only to the tree nodes that they render.

### `08.async:`

This example includes reading from an asynchronous API, fetching data in response to user input, showing loading indicators, caching the response, and invalidating the cache. It uses [Redux Thunk](https://github.com/gaearon/redux-thunk) middleware to encapsulate asynchronous side effects.

### `09.universal:`

This is a basic demonstration of [server rendering](https://github.com/reactjs/redux/blob/master/docs/recipes/ServerRendering.md) with Redux and React. It shows how to prepare the initial store state on the server, and pass it down to the client so the client store can boot up from an existing state.

### `10.real-world:`

This is the most advanced example. It is dense by design. It covers keeping fetched entities in a normalized cache, implementing a custom middleware for API calls, rendering partially loaded data, pagination, caching responses, displaying error messages, and routing. Additionally, it includes Redux DevTools.

> **NOTE**

> You should first update the [access-token](https://developer.github.com/v3/oauth/) necessary for calling [APIs of github](https://developer.github.com/v3/) which is stored in `10.real-world/src/constants/Github`. You can link to https://github.com/settings/tokens to generate a new token and update the value of `ACCESSTOKEN`  that will make this demo run correctly when calling [APIs of github](https://developer.github.com/v3/).

### `11.todos-flow:`

This is the same as `03.todos`, but it import [Facebook/Flow](https://flowtype.org/) to check Javascript.

## 4. Learn how to test your applicatons by [Facebook/Jest](http://facebook.github.io/jest/)

You should execute `cd redux-grope` and `node bin/jest [-p] [-r] [-i] <params> |  npm test`  to do unit testing.

####  Options about `node bin/jest [options] | npm test`

* `-bail <Boolean>` : Indicates whether to have Jest stop running tests after the first failure `-b`  is the shortcut of `-bail`  and `-b1`  is the shortcut of `-bail true`
* `-verbose <Boolean>` : Indicates whether each individual test should be reported during the run. `-v`  is the shortcut of `-verbose`  and `-v0`  is the shortcut of `-verbose false`
* `-path <Path>` : Indicates which file should be run by its path. `-p` is its shortcut, e.g. `-p tests/02.counter/src/components/Counter.spec.js`
* `-regexp <RegExp>`  : Indicates which files should be run together by a Regular Expression `-r`  is the shortcut, e.g. `-r tests/02.counter/src/components/.*.spec.js`
* `-index <Number>` : Indicates which demo should be test. `-i` is its shortcut, e.g.  `-i 02 `

#### Also there is some npm-scripts that you can execute:

* `npm run jest-all` : the same to `node bin/jest -r tests/.*/src/.*/.*.spec.js -v0 | npm test`
* `npm run jest-all-v` : the same to `node bin/jest -r tests/.*/src/.*/.*.spec.js | npm test`
* `npm run jest-i <number>` : the same to `jest-i": "node bin/jest -v0 -i <number>`
* `npm run jest-v-i <number>`  : the same to `node bin/jest -i <number>`

#### Sources may usefull:

* [Jest APIs](http://facebook.github.io/jest/docs/api.html)
* [How to test Async code](http://facebook.github.io/jest/docs/tutorial-async.html#content)
* [React Test Utilities](https://facebook.github.io/react/docs/test-utils.html)

## 5. Learn how to check your applicatons by [Facebook/Flow](https://flowtype.org/)

You should execute `cd redux-grope/main/11.todos-flow/src` and `flow`  to do unit testing.

> **NOTE**

> FLow just support some platform included `darwin` or `linux/x64` or `win32/x64`
>You can check your paltform and arch by node.js in Terminal as follow:

```
 $ node
 > process.platform
 'win32'
 > process.arch'
 'x64'
 > .exit
 ```
You will see stdout like follows when flow is starting. If there has some errors in code, there will Indicate where it is and its description.

```
←[0K] Launching Flow server for D:\redux-grope
Spawned flow server (pid=8868)
Logs will go to C:\Users\shangfeiSF\AppData\Local\Temp\flow\redux-grope.log
←[0K] flow is still initializing; this can take some time. [parsing]
←[0K] flow is still initializing; this can take some time. [merging inference]
←[0K] No errors!
```

#### Checking third-party code

Most real JavaScript programs depend on third-party libraries. To handle this, Flow supports the concept of a [Library Definition](https://flowtype.org/docs/third-party.html),  "libdef" for short.

You can update the directory`flow-typed/`  by `flow-typed install`
#### Sources may usefull:

* [flow-bin](https://github.com/flowtype/flow-bin)
* [flow-typed](https://github.com/flowtype/flow-typed/)