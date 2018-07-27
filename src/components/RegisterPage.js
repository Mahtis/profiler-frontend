import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

import { submitRegister } from '../api'
import { saveToken } from '../util'

class RegisterPage extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    passwordCheck: '',
    passwordCheckError: false,
    logged: false
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    if (event.target.name === 'passwordCheck') {
      this.setState({ passwordCheckError: event.target.value !== this.state.password })
    }
  }

  submitRegister = () => {
    const {
      firstname,
      lastname,
      email,
      username,
      password
    } = this.state
    console.log(this.state)
    submitRegister({ firstname, lastname, email, username, password }).then(res => {
      if (res.data.account) {
        saveToken(res.data.token)
        console.log(res.data)
        this.setState({ logged: true })
      }
    })
  }

  render() {
    if (this.state.logged) return <Redirect to="/my_page" />
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <h1>Register to the Profiler app</h1>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{ textAlign: 'center', padding: '10%' }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Username"
                margin="normal"
                placeholder="username"
                name="username"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="First name"
                margin="normal"
                placeholder="e.g. Martin"
                name="firstname"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Last name"
                margin="normal"
                placeholder="e.g. Prince"
                name="lastname"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="E-mail"
                margin="normal"
                placeholder="yourname@example.com"
                name="email"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="password"
                label="Password"
                margin="normal"
                placeholder="at least 8 characters"
                name="password"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                error={this.state.passwordCheckError}
                type="password"
                label="Re-enter password"
                margin="normal"
                name="passwordCheck"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="raised" color="primary" onClick={this.submitRegister} >Register</Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default RegisterPage
