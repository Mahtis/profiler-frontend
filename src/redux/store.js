import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const userReducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
  case 'GET_USER_SUCCESS':
    return action
  case 'GET_USER_FAILURE':
    return state
  default:
    return state
  }
}

const reducers = combineReducers({
  user: userReducer
})


const store = createStore(reducers, applyMiddleware(thunk))

export default store
