const handler = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }

    case 'TOGGLE':
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        completed: !state.completed
      }

    default:
      return state
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        handler(undefined, action)
      ]

    case 'TOGGLE':
      return state.map(t =>
        handler(t, action)
      )

    default:
      return state
  }
}