// @flow

import React, {PropTypes}from 'react'

export type Props = {
  active: boolean,
  onClick: () => void,
  children?: React$Element<any>
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