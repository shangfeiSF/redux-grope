/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React from 'react';
import {render} from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './App';
import reducers from './reducers';

import '../../global.css';

const store = createStore(reducers);
const content = (
    <Provider store={store}>
        <App/>
    </Provider>
);

render(content, document.getElementById('example'));
