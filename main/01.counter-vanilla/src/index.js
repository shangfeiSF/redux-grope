/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import {createStore} from 'redux';

import '../../global.css';

// assistants
const getById = id => document.getElementById(id);
const addListener = (node, type, listener) => node.addEventListener(type, listener);

class App {
    constructor() {
        this.store = null;
        this.types = {increment: 'INCREMENT', decrement: 'DECREMENT'};
        this.nodes = {};
    }

    reducers = (state, action) => {
        switch (action.type) {
            case this.types.increment:
                return state + 1;
            case this.types.decrement:
                return state - 1;
            default:
                return state;
        }
    }

    boot = () => {
        this.nodes.times = getById('times');
        this.nodes.increase = getById('increase');
        this.nodes.decrease = getById('decrease');
        this.nodes.increaseIfOdd = getById('increaseIfOdd');
        this.nodes.increaseAsync = getById('increaseAsync');

        // Redux createStore with reducers and subscribe the dispatch actions
        this.store = createStore(this.reducers, 0);
        this.store.subscribe(this.render);
    }

    render = () => this.nodes.times.innerHTML = `${this.store.getState()}`

    bind = () => {
        const EVENT = 'click';

        addListener(this.nodes.increase, EVENT, () => {
            this.store.dispatch({type: this.types.increment});
        });

        addListener(this.nodes.decrease, EVENT, () => {
            this.store.dispatch({type: this.types.decrement});
        });

        addListener(this.nodes.increaseIfOdd, EVENT, () => {
            this.store.getState() % 2 !== 0 && this.store.dispatch({type: this.types.increment});
        })

        addListener(this.nodes.increaseAsync, EVENT, () => {
            setTimeout(this.store.dispatch({type: this.types.increment}), 1000);
        })
    }

    init = () => {
        this.boot();
        this.render();
        this.bind();
    }
}

new App().init();
