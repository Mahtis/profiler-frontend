import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProfilePage from './ProfilePage'
import Tabs, { Tab } from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'

const BASE_PATH = '/'

const Main = () => (
  <div>
    <Router basename={BASE_PATH} >
      <div>
        <AppBar position='static'>
          <Tabs>
            <Tab label="One" />
            <Tab label="Two" />
            <Tab label="Three" />
          </Tabs>
        </AppBar>
        <Switch>
          <Route path="/profiles" component={ProfilePage} />
        </Switch>
      </div>
    </Router>
  </div>
)

export default Main