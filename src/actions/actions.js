import { getUser } from '../api.js'

export const getUserAction = () => {
  return async dispatch => {
    try {
      const { data } = await getUser()
      dispatch({
        type: 'GET_USER_SUCCESS',
        payload: data
      })
    } catch(e) {
      dispatch({
        type: 'GET_USER_FAILURE',
        payload: { error: 'request failed' }
      })
    }
  }
}