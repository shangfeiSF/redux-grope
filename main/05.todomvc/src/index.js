/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React from 'react';
import {render} from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import AppContainer from './containers/AppContainer';
import reducers from './reducers';

import 'todomvc-app-css/index.css';
import '../../global.css';

const store = createStore(reducers);
const content = (
    <Provider store={store}>
        <AppContainer/>
    </Provider>
);

render(content, document.getElementById('example'));
