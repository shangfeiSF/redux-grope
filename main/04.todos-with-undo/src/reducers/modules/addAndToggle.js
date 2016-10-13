import undoable from 'redux-undo'

const addAndToggle = undoable((state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]

    case 'TOGGLE':
      return state.map((t) => {
        if (t.id !== action.id) {
          return t
        }
        return {
          ...t,
          completed: !t.completed
        }
      })

    default:
      return state
  }
})

export default addAndToggle