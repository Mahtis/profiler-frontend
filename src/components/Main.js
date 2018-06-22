import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Tabs, { Tab } from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'

import { getUserAction } from '../actions/actions.js'

import ProfilePage from './ProfilePage'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import UserPage from './UserPage'

const BASE_PATH = '/'

class Main extends Component {

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

  render() {
    return (
      <div>
        <Router basename={BASE_PATH} >
          <div>
            <AppBar position='static'>
              <Tabs>
                <Tab label="home" href="/" />
                <Tab label="my page" href="/my_page"/>
                <Tab label="login" href="/login" />
                <Tab label="register" href="/register" />
              </Tabs>
            </AppBar>
            <Switch>
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/my_page" component={UserPage} />
              <Route path="/profiles/:profileId" component={ProfilePage} />
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