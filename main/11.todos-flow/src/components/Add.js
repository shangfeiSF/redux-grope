import React, {PropTypes}from 'react'

export type Props = {
  onSubmit: () => void
}

const Add = ({onSubmit}: Props) => {
  let input
  return (
    <div>
      <form onSubmit={e =>{
        e.preventDefault()

        if (input.value.trim().length) {
          onSubmit(input.value)
          input.value = ''
        }
      }}>

        <input ref={node => {
          input = node
        }}/>
        <button type="submit">Add</button>

      </form>
    </div>
  )
}

Add.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Add