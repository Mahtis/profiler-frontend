import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import List, { ListItem, ListItemText} from 'material-ui/List'
import Button from 'material-ui/Button'
import axios from 'axios'

class ProfilePage extends Component {
  constructor() {
    super()

    this.state = {
      responses: {},
      user: 'user'
    }

    //this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { profileId } = this.props.match.params
    axios.get(`http://localhost:8000/profiles/${profileId}`).then(res => {
      const { questions, id, picture, account_id } = res.data
      this.setState({ questions, id, picture, account_id })
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

  submitResponses = e => {
    console.log(this.state.responses)
    axios.post('http://localhost:8000/responses', this.state.responses).then(res => {
      this.setState({ responseData: res.data.amounts })
      console.log(res)
    })
  }

  renderQuestions = () => {
    if (this.state.user) return (
      <List>
        {this.state.questions.map((question) => (
          <ListItem>
            <ListItemText inset primary={question.text} />
            <TextField 
              select 
              name={question.id}
              fullWidth
              margin="normal"
              value={this.state.responses[question.id]? this.state.responses[question.id] : ''}
              onChange={this.handleChange} >
              {question.response_options.map((option) => (
                <MenuItem value={option.id}>{option.option_value}</MenuItem>
              ))}
            </TextField>
          </ListItem>
        ))}
      </List>
    )
    return (
      <List>
        {this.state.questions.map((question) => (
          <ListItem>
            <ListItemText inset primary={question.text} />
          </ListItem>
        ))}
      </List>
    )
  }

  renderButton = () => {
    if (this.state.user) return (
        <Button variant="raised" color="primary" onClick={this.submitResponses} >
            Submit answers
        </Button> 
    )
    return (
      <div>
        <Button variant="raised" color="primary" disabled onClick={this.submitResponses} >
            Submit answers
        </Button>
        <p><a href="#">Register</a> or <a href="#">log in</a> to submit your responses</p>
      </div> 
    )
  }

  render() {
    console.log(this.state.responseData)
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
            <List>
              {this.state.responseData.map((response) => (
                <ListItem>
                  <ListItemText inset primary={`${(response.amount / response.total * 100).toFixed(0)}%`} />
                </ListItem>
              ))}
            </List>
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
