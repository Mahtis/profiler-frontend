import axios from 'axios'

export const BASE_PATH = 'http://localhost:8000'

export const API_PATH = 'http://localhost:8000/api'

export const getToken = () => {
  const token = localStorage.getItem('token')
  //console.log(token)
  return token
}

export const saveToken = token => {
  try {
    localStorage.setItem('token', token)
    return token
  } catch(e) {
    return null
  }
}

export const login = data => axios.post(`${API_PATH}/login`, data, {
  headers: {
    credentials: 'same-origin'
  }
}).then(res => saveToken(res.data.token)).catch(e => console.log(e))

export const getJson = path => axios.get(`${API_PATH}/${path}`, {
  headers: {
    credentials: 'same-origin',
    'x-access-token': getToken()
  }
})

export const postJson = (path, data) => axios.post(`${API_PATH}/${path}`, data, {
  headers: {
    credentials: 'same-origin',
    'x-access-token': getToken()
  }
})
