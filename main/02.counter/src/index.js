/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';

import Counter from './components/Counter';
import reducers from './reducers';

import '../../global.css';

// assistants
const getById = id => document.getElementById(id);

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

class App {
    constructor() {
        // Redux createStore with reducers and subscribe the dispatch actions
        this.store = createStore(reducers, 9);
        this.store.subscribe(this.render);
    }

    render = () => {
        const content = <Counter
            value={this.store.getState()}
            handlerOnIncrease={() => this.store.dispatch({type: INCREMENT})}
            handlerOnDecrease={() => this.store.dispatch({type: DECREMENT})}
        />;

        render(content, getById('example'));
    }

    init = () => this.render()
}

new App().init();
