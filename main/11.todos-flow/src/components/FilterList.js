// @flow

import React, {PropTypes}from 'react'
import {ALL, ACTIVE, COMPLETED} from '../constants/FilterTypes'
import FilterContainer from '../containers/FilterContainer'

const FilterList = () => (
  <div>
    <h3>FilterList</h3>

    <ul>
      <li className="all">
        <FilterContainer filter={ALL}>All</FilterContainer>
      </li>

      <li className="active">
        <FilterContainer filter={ACTIVE}>Active</FilterContainer>
      </li>

      <li className="completed">
        <FilterContainer filter={COMPLETED}>Completed</FilterContainer>
      </li>
    </ul>
  </div>
)

export default FilterList