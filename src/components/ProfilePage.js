import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import List, { ListItem, ListItemText} from 'material-ui/List'
import axios from 'axios'

class ProfilePage extends Component {
  constructor() {
    super()

    this.state = {
      responses: {}
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:8000/data').then(data => {
      const { questions, id, picture, account_id } = data.data
      this.setState({ questions, id, picture, account_id })
    })
    axios.get('http://localhost:8000/responses').then(data => {
      this.setState({ responseData: data.data })
    })
  }

  getResponsePercentages() {
    this.state.responseData[0][this.state.responses['1']]
  }

  handleChange(event) {
    //console.log(event.target)
    //console.log(event.target.name)
    //console.log(event.target.value)
    //console.log(this.state)
    const responses = this.state.responses
    responses[event.target.name] = event.target.value
    this.setState({ responses })
    this.state.responseData.map((resp) => {
      console.log(resp)
    })
    //console.log(responses)
  }

  render() {
    console.log(this.state.responseData)
    return this.state.questions? (
      <Grid container spacing={24} justify="space-around">
        <Grid item xs={4}>
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
        </Grid>
        <Grid item xs={4}>
          <img style={ { maxWidth: '100%' } } src={`http://localhost:8000/${this.state.picture}`} alt="Something" />
        </Grid>
        <Grid item xs={4}>
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
        </Grid>
      </Grid>
    ) :
      <p> Waiting </p>
  }
}

export default ProfilePage
