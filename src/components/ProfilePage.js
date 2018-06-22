import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'
import { getProfile, submitResponses } from '../api'

class ProfilePage extends Component {
  constructor() {
    super()

    this.state = {
      responses: {},
      user: {}
    }

    //this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { profileId } = this.props.match.params
    getProfile(profileId).then(res => {
      const { questions, id, picture, account_id } = res.data.profile
      this.setState({ questions, id, picture, account_id })
      if (res.data.amounts) {
        console.log(res.data)
        this.setState({ responseData: res.data.amounts, correct: res.data.correct })
      }
    }).catch(e => {
      console.log(e)
    })
  }

  getResponsePercentages() {
    this.state.responseData[0][this.state.responses['1']]
  }

  handleChange = (event) => {
    const responses = this.state.responses
    responses[event.target.name] = event.target.value
    this.setState({ responses })
    /*this.state.responseData.map((resp) => {
      console.log(resp)
    })*/
  }

  submitResponses = () => {
    console.log(this.state.responses)
    submitResponses(this.state.responses).then(res => {
      this.setState({ responseData: res.data.amounts })
      console.log(res)
    })
  }

  renderQuestions = () => {
    if (this.state.user) return (
      <List>
        {this.state.questions.map((question) => (
          <ListItem key={question.id}>
            <ListItemText inset primary={question.text} />
            <TextField
              select
              name={question.id}
              fullWidth
              margin="normal"
              value={this.state.responses[question.id]? this.state.responses[question.id] : ''}
              onChange={this.handleChange} >
              {question.response_options.map((option) => (
                <MenuItem key={option.id} value={option.id}>{option.option_value}</MenuItem>
              ))}
            </TextField>
          </ListItem>
        ))}
      </List>
    )
    return (
      <List>
        {this.state.questions.map((question) => (
          <ListItem key={question.id}>
            <ListItemText inset primary={question.text} />
          </ListItem>
        ))}
      </List>
    )
  }

  renderButton = () => (
    <Button variant="raised" color="primary" disabled={!this.state.user} onClick={this.submitResponses} >
        Submit answers
    </Button>
  )

  render() {
    //console.log(this.state.responseData)
    return this.state.questions ? (
      <Grid container spacing={24} justify="space-around">
        <Grid item xs={4}>
          {this.renderQuestions()}
          {this.renderButton()}
        </Grid>
        <Grid item xs={4}>
          <img style={ { maxWidth: '100%' } } src={`http://localhost:8000/${this.state.picture}`} alt="Something" />
          <Button variant="raised" href={`/profiles/${(parseInt(this.props.match.params.profileId) - 1)}`} >previous</Button>
          <Button variant="raised" href={`/profiles/${(parseInt(this.props.match.params.profileId) + 1)}`}>next</Button>
        </Grid>
        <Grid item xs={4}>
          {this.state.responseData ? (
            <div>
              <h2>You got {this.state.correct}/{this.state.responseData.length} correct!</h2>
              <List>
                {this.state.responseData.map((response) => (
                  <ListItem key={response.response_option_id}>
                    <ListItemText inset primary={`${(response.amount / response.total * 100).toFixed(0)}%`} />
                  </ListItem>
                ))}
              </List>
            </div>
          ) :
            <p>Submit responses to see how well you did</p> 
          }
          
        </Grid>
      </Grid>
    ) :
      <p> Waiting </p>
  }
}

export default ProfilePage
