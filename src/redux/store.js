import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const userReducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
  case 'GET_USER':
    return action
  default:
    return state
  }
}

const reducers = combineReducers({
  user: userReducer
})


const store = createStore(reducers, applyMiddleware(thunk))

export default store
