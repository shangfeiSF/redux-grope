// @flow

import React from 'react'
import * as FilterTypes from '../constants/FilterTypes'
import FilterContainer from '../containers/FilterContainer'

const FilterList = () => (
  <div>
    <h3>FilterList</h3>

    <ul>
      <li className="all">
        <FilterContainer filter={FilterTypes.ALL}>All</FilterContainer>
      </li>

      <li className="active">
        <FilterContainer filter={FilterTypes.ACTIVE}>Active</FilterContainer>
      </li>

      <li className="completed">
        <FilterContainer filter={FilterTypes.COMPLETED}>Completed</FilterContainer>
      </li>
    </ul>
  </div>
)

export default FilterList