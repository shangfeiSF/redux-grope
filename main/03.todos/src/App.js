/**
 * @file Simple Redux Usage
 * @author shangfei87
 */

import React from 'react';

/*
 *  The presentational components: container/*.js
 *  Position: middle
 *  Using Redux: no
 * 	Read data: from props
 * 	Write data: from props
 * */

// App => FilterList
import FilterList from './components/FilterList';

/*
 * 	The container components: components/*.js
 * 	Position: top
 * 	Using Redux: yes
 * 	Read data: from state
 *  Write data: dispatch the action
 * */

//  App => ItemListContainer, AddContainer
import ItemListContainer from './containers/ItemListContainer';
import AddContainer from './containers/AddContainer';

/*
 * Structures
 * App -- FilterList -- FilterContainer(Filter)
 *     -- ItemListContainer(ItemList -- Item)
 *     -- AddContainer(Add)
 * */

const App = () => (
    <div>
        <FilterList/>
        <ItemListContainer/>
        <AddContainer/>
    </div>
);

export default App;
