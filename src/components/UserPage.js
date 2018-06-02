import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import { getUserProfiles, getUserResponses } from '../api'

class UserPage extends Component {
  state = {
    responses: [],
    profiles: []
  }

  componentDidMount() {
    // get user's profiles with stats, but only if it is empty
    // i.e. store stats in global state
    getUserProfiles().then(res => this.setState({ profiles: res.data }))
    getUserResponses().then(res => this.setState({ responses: res.data }))
    // get user scores
    // get user reviews with scores

  }

  render() {
    console.log(this.state.responses)
    //const corrects = this.state.responses.map()
    return (
      <Grid container spacing={24}>
        <Grid item xs={4}>
          <h3>Your profiles</h3>
          <List>
            {this.state.profiles.map(profile => (
              <ListItem button component="a" href={`/profiles/${profile.id}`} key={profile.id}>
                <img alt={`Profile ${profile.id}:`} src={`http://localhost:8000/${profile.thumbnail}`} />
                <ListItemText primary={`${profile.correct.toFixed(2)}% correct with ${profile.total} reviews`} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={4}>
          <h3>Your profile scores</h3>
          <h2>Profiles reviewed: {this.state.responses.length}</h2>
          <h2>Correct responses: XX%</h2>
          <h2>Agreement with others: XX%</h2>
        </Grid>
        <Grid item xs={4}>
          <h3>Profiles you have scored</h3>
          <List>
            {this.state.responses.map(profile => (
              <ListItem button component="a" href={`/profiles/${profile.profileId}`} key={profile.profileId}>
                <Avatar alt={`Profile ${profile.profileId}:`} src={`http://localhost:8000/${profile.thumbnail}`} />
                <ListItemText primary={`${profile.correct}/${profile.total} correct`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    )
  }
}

export default UserPage
