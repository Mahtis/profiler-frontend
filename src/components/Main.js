import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'

import { getUserAction } from '../actions/actions.js'

import ProfilePage from './ProfilePage'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import UserPage from './UserPage'
import CreateProfilePage from './CreateProfilePage'
import AdminPage from './AdminPage'

const BASE_PATH = '/'

class Main extends Component {
  state = {
    value: 'home'
  }

  componentDidMount() {
    if (localStorage.token) {
      const token = jwt.decode(localStorage.token)
      const current_time = Date.now() / 1000
      if ( token.exp < current_time) {
        localStorage.removeItem('token')
      } else {
        this.props.dispatchGetUser()
      }
    }
  }

  handleChange = (e, value) => {
    this.setState({ value })
  }

  render() {
    return (
      <div>
        <Router basename={BASE_PATH} >
          <div>
            <AppBar position='static'>
              <Tabs value={this.state.value} onChange={this.handleChange}>
                <Tab value="home" label="home" component={Link} to="/" />
                <Tab value="my page" label="my page" component={Link} to="/my_page"/>
                <Tab value="login" label="login" component={Link} to="/login" />
                <Tab value="register" label="register" component={Link} to="/register" />
                <Tab value="admin" label="admin" component={Link} to="/admin" />
              </Tabs>
            </AppBar>
            <Switch>
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/my_page/create_profile" component={CreateProfilePage} />
              <Route path="/my_page" component={UserPage} />
              <Route path="/profiles/:profileId" component={ProfilePage} />
              <Route path="/admin" component={AdminPage} />
              <Route path="/" component={HomePage} />
            </Switch>
            <div>
              <p>This is the footer</p>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchGetUser: () =>
    dispatch(getUserAction())
})

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)