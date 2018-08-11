import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import List, { ListItem, ListItemText } from '@material-ui/core/List'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import { getUserProfiles, getUserResponses } from '../api'
import { BASE_PATH } from '../util'

class UserPage extends Component {
  state = {
    responses: [],
    profiles: [],
    totalCorrect: 0
  }

  componentDidMount() {
    // get user's profiles with stats, but only if it is empty
    // i.e. store stats in global state
    getUserProfiles().then(res => this.setState({ profiles: res.data }))
    getUserResponses().then(res => this.setState({ responses: res.data.profiles, totalCorrect: res.data.totalCorrect }))
    // get user scores
    // get user reviews with scores

  }

  totalAgreement = (responses) => {
    const total = responses.reduce((total, resp) => total + resp.agreement.agreement, 0)
    console.log(total)
    console.log(total / responses.length)
    return (total / responses.length).toFixed(2)
  }

  render() {
    console.log(this.state)
    //const corrects = this.state.responses.map()
    return (
      <Grid container spacing={24}>
        <Grid item xs={4}>
          <h3>Your profiles <Button variant="raised" href="/my_page/create_profile">create profile</Button></h3>
          <List>
            {this.state.profiles.map(profile => (
              <ListItem button component="a" href={`/profiles/${profile.id}`} key={profile.id}>
                <img alt={`Profile ${profile.id}:`} src={`${BASE_PATH}/${profile.thumbnail}`} />
                <ListItemText primary={`${profile.correct.toFixed(2)}% correct with ${profile.total} reviews`} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={4}>
          <h3>Your profile scores</h3>
          <h2>Profiles reviewed: {this.state.responses.length}</h2>
          <h2>Correct responses: {this.state.totalCorrect.toFixed(2)}%</h2>
          <h2>Agreement with others: {this.totalAgreement(this.state.responses)}%</h2>
        </Grid>
        <Grid item xs={4}>
          <h3>Profiles you have scored</h3>
          <List>
            {this.state.responses.map(profile => (
              <ListItem button component="a" href={`/profiles/${profile.profileId}`} key={profile.profileId}>
                <Avatar alt={`Profile ${profile.profileId}:`} src={`${BASE_PATH}/${profile.thumbnail}`} />
                <ListItemText primary={`${profile.correct}/${profile.total} correct, ${profile.agreement.agreement.toFixed(2)}% agreement` } />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    )
  }
}

export default UserPage
