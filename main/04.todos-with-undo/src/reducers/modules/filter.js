// ES6参数默认值语法实现的 state.filter初始化'SHOW_ALL'
export default (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.filter

    default:
      return state
  }
}