import React from 'react'

import FilterContainer from '../containers/FilterContainer'

const Footer = () => (
  <div>
    <h3>FilterList</h3>
    
    <ul>
      <li className="all">
        <FilterContainer filter="SHOW_ALL">All</FilterContainer>
      </li>

      <li className="active">
        <FilterContainer filter="SHOW_ACTIVE">Active</FilterContainer>
      </li>

      <li className="completed">
        <FilterContainer filter="SHOW_COMPLETED">Completed</FilterContainer>
      </li>
    </ul>
  </div>
)

export default Footer