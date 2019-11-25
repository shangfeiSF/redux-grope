/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React from 'react';

import FilterList from './components/FilterList';

import ItemListContainer from './containers/ItemListContainer';
import AddContainer from './containers/AddContainer';
import UndoRedoContainer from './containers/UndoRedoContainer';

const App = () => (
    <div>
        <FilterList/>
        <ItemListContainer/>
        <AddContainer/>
        <UndoRedoContainer/>
    </div>
);

export default App;
