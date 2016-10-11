// ES6参数默认值语法实现的 state.addAndToggle初始化[]
export default (state = [], action) => {
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
}