import React from 'react'

import FilterLink from '../containers/FilterLink'

const Footer = () => (
  <div>
    <h3>Show</h3>

    <div className="all">
      <FilterLink filter="SHOW_ALL">All</FilterLink>
    </div>

    <div className="active">
      <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    </div>

    <div className="completed">
      <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
    </div>
  </div>
)

export default Footer
