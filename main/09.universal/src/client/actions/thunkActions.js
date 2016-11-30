import * as syncActions from './syncActions'

export const increaseIfOdd = () => (dispatch, getState) => {
  const {counter} = getState()
  return counter % 2 === 0 ?
    false :
    dispatch(syncActions.increase())
}

export const increaseDelay = () => dispatch => {
  setTimeout(() => {
    dispatch(syncActions.increase())
  }, 1000)
}

export const increameAsync = () => dispatch => {
  return fetch('http://localhost:3000/serverTime.json')
    .then(response => response.json())
    .then(json => {
      let serverTime = json.serverTime
      if (serverTime % 2 === 0) {
        return dispatch(syncActions.increase())
      } else {
        return false
      }
    })
}