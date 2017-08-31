// @flow

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import type {Event} from '../types'

export type Props = {
  active: boolean,
  onClick: () => void,
  children?: React$Element<any>
}

class Filter extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
  }

  handlerOnClick = (e: Event) => {
    e.preventDefault()

    this.props.onClick()
  }

  render() {
    let {active, children}: Props = this.props
    let block = active ?
      (<span>{children}</span>) :
      (<a href="#" onClick={this.handlerOnClick}>{children}</a>)

    return block
  }
}

export default Filter