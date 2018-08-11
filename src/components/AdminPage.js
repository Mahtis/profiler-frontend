import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import { getQuestions } from '../api'

class AdminPage extends Component {
  state = {
    questions: [],
    currentQuestion: '',
    addOption: ''
  }

  componentDidMount() {
    getQuestions().then(res => this.setState({ questions: res.data }))
  }

  selectQuestion = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleEditQuestion = (e) => {
    const { currentQuestion } = this.state
    const questions = [...this.state.questions]
    const question = questions.find(q => q.id === currentQuestion)
    if (e.target.name === 'text') {
      question.text = e.target.value
    } else {
      question.response_options[e.target.name].option_value = e.target.value
      console.log(question.response_options[e.target.name])
    }
    console.log(question)
    this.setState({ questions })
  }

  handleAddOption = (e) => {

  }

  render() {
    const { questions, currentQuestion } = this.state
    const question = currentQuestion === '' ? null : questions.find(q => q.id === currentQuestion)
    return (
      <Grid container>
        <Grid item xs={12}>
          <h1> Manage questions </h1>
          <Select name="currentQuestion" value={currentQuestion} displayEmpty onChange={this.selectQuestion} >
            <MenuItem value=''>Select a question to edit</MenuItem>
            {questions.map(question => <MenuItem value={question.id} key={question.id}>{question.text}</MenuItem>)}
          </Select>
          <Button color="primary" variant="outlined">Add question</Button>
          {question ?
            <Grid item xs={5}>
              <Paper>
                <Grid item>
                  <TextField fullWidth name="text" value={question.text} onChange={this.handleEditQuestion} />
                </Grid>
                <Grid item xs={2}>
                  {question.response_options.map((option, i) => (
                    <TextField
                      key={option.id}
                      name={i}
                      label={`Option ${option.id}`}
                      margin="normal"
                      placeholder="option value"
                      value={option.option_value}
                      onChange={this.handleEditQuestion}
                    />
                  ))}
                </Grid>
                <TextField
                  label="Add option"
                  margin="normal"
                  placeholder="option value"
                  name="addOption"
                  onChange={this.handleAddOption}
                />
              </Paper>
            </Grid>
            : undefined}
        </Grid>
        <Grid item xs={12}>
          <h1> Manage users </h1>
          
        </Grid>
        <Grid item>
          <h1> Manage profiles </h1>
          <Select value={currentQuestion} displayEmpty onChange={this.selectQuestion} >
            <MenuItem value='' disabled>Select a question to edit</MenuItem>
            {questions.map(question => <MenuItem value={question.id} key={question.id}>{question.text}</MenuItem>)}
          </Select>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, null)(AdminPage)
