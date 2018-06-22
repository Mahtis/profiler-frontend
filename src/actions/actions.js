import { getUser } from '../api.js'

export const getUserAction = () => {
  return async dispatch => {
    const { data } = await getUser()
    dispatch({
      type: 'GET_USER',
      payload: data
    })
  }
}