/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import ItemList from './ItemList';

class App extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    }

    render() {
        return (
            <div>
                <Header add={this.props.actions._add_}/>
                <ItemList todos={this.props.todos} actions={this.props.actions}/>
            </div>
        );
    }
}

export default App;
