import React from 'react'

import FilterLink from '../containers/FilterLink'

const Footer = () => (
  <div>
    <h3>FilterLinkList</h3>
    <ul>
      <li className="all">
        <FilterLink filter="SHOW_ALL">All</FilterLink>
      </li>

      <li className="active">
        <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
      </li>

      <li className="completed">
        <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
      </li>
    </ul>
  </div>
)

export default Footer
