import * as syncActions from './syncActions'
import  * as UTILS from '../utils/index'

const URL = 'http://localhost:3000/serverTime.json'

export const increaseIfOdd = () => (dispatch, getState) => {
  const {counter} = getState()
  return counter % 2 === 0 ?
    false :
    dispatch(syncActions.increase())
}

export const increameAsync = () => dispatch => {
  return dispatch(UTILS._fetch(URL))
}