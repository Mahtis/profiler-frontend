import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Tabs, { Tab } from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'

import ProfilePage from './ProfilePage'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

const BASE_PATH = '/'

const Main = () => (
  <div>
    <Router basename={BASE_PATH} >
      <div>
        <AppBar position='static'>
          <Tabs>
            <Tab label="home" href="/" />
            <Tab label="my page" />
            <Tab label="login" href="/login" />
            <Tab label="register" href="/register" />
          </Tabs>
        </AppBar>
        <Switch>
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profiles/:profileId" component={ProfilePage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  </div>
)

export default Main