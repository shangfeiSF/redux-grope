import React from 'react'
import {connect} from 'react-redux'

import {add} from '../actions'

let Add = ({dispatch}) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(add(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }}/>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

Add = connect()(Add)

export default Add
