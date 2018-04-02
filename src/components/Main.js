import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProfilePage from './ProfilePage'

const BASE_PATH = '/'

const Main = () => (
  <div>
    <Router basename={BASE_PATH} >
      <Switch>
        <Route path="/profiles" component={ProfilePage} />
      </Switch>
    </Router>
  </div>
)

export default Main