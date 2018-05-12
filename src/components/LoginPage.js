import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'


class LoginPage extends Component {

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  submitLogin = () => {
    axios.post('http://localhost:8000/login', this.state).then(res => {
      console.log(res)
    })
    console.log(this.state)
  }
  
  render() {
    return (
      <div>
        <h1>this is a login page</h1>
        <p><span>Username: </span><TextField name="username" onChange={this.handleChange} /></p>
        <p><span>Password: </span><TextField name="password" type="password" onChange={this.handleChange} /></p>
        <Button variant="raised" color="primary" onClick={this.submitLogin} >Login</Button>

        <p>Not yet registered? <Link to="/register">Sign up!</Link> </p>
      </div>
    )
  }
}

export default LoginPage
