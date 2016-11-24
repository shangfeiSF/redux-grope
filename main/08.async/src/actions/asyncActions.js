import  * as UTILS from '../utils/index'

export const fetchIfNeed = theme => (dispatch, getState) => {
  if (UTILS._need(getState(), theme)) {
    return dispatch(UTILS._fetch(theme))
  } else {
    return false
  }
}