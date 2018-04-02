import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import Main from './components/Main'

class App extends Component {
  render() {
    //const profile = axios.get('localhost:8000/profiles')
    axios.get('http://localhost:8000/data')
      .then(resp => { 
        console.log(resp)
      })
      .catch(function (error) {
        console.log(error)
      })
    return (
      <Main />
    )
  }
}

export default App
