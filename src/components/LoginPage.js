import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import { login } from '../util'

class LoginPage extends Component {

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  submitLogin = () => {
    login(this.state).then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div>
        <h1>this is a login page</h1>
        <div>
          <span>Username: </span><TextField name="username" onChange={this.handleChange} />
        </div>
        <div>
          <span>Password: </span><TextField name="password" type="password" onChange={this.handleChange} />
        </div>
        <div>
          <Button variant="raised" color="primary" onClick={this.submitLogin} >Login</Button>
        </div>

        <p>Not yet registered? <Link to="/register">Sign up!</Link> </p>
      </div>
    )
  }
}

export default LoginPage
