// @flow

import React from 'react'

import FilterList from './FilterList'

import ItemListContainer from '../containers/ItemListContainer'
import AddContainer from '../containers/AddContainer'

const App = () => (
  <div>
    <FilterList />
    <ItemListContainer />
    <AddContainer />
  </div>
)

export default App