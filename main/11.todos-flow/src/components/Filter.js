// @flow

import React, {PropTypes}from 'react'

export type Props = {
  active: boolean,
  children?: React$Element<any>,
  onClick: () => void
}

const Filter = ({active, children, onClick}: Props) => active ?
  (<span>{children}</span>) :
  (<a href="#" onClick={e => {
      e.preventDefault()
      onClick()
    }}>
    {children}
  </a>)

Filter.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Filter