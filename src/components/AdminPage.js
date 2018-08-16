import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Delete from '@material-ui/icons/Delete'

import { getQuestions, getUsers } from '../api'

class AdminPage extends Component {
  state = {
    questions: [],
    currentQuestion: '',
    users: [],
    currentUser: ''
  }

  componentDidMount() {
    getQuestions().then(res => this.setState({ questions: res.data }))
    getUsers().then(res => this.setState({ users: res.data }))
  }

  selectQuestion = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleEditQuestion = (e) => {
    const { currentQuestion } = this.state
    const questions = [...this.state.questions]
    const question = questions[currentQuestion]
    if (e.target.name === 'text') {
      question.text = e.target.value
    } else {
      question.response_options[e.target.name].option_value = e.target.value
      console.log(question.response_options[e.target.name])
    }
    console.log(question)
    this.setState({ questions })
  }

  handleDelete = (e) => {
    const questions= [...this.state.questions]
    const question = questions[this.state.currentQuestion]
    question.response_options.splice([e.currentTarget.value], 1)
    this.setState({ questions })
  }

  addQuestion = (e) => {
    const questions= [...this.state.questions]
    questions.push({ text: '', response_options: [] })
    this.setState({ questions, currentQuestion: questions.length-1 })
  }

  handleAddOption = (e) => {
    const { currentQuestion } = this.state
    const questions = [...this.state.questions]
    const question = questions[currentQuestion]
    question.response_options.push({ question_id: question.id, option_value: '' })
    this.setState({ questions })
  }

  submitQuestion = (e) => {
    console.log('send')
    this.setState({ currentQuestion: '' })
  }

  render() {
    console.log(this.state)
    const { questions, currentQuestion, users, currentUser } = this.state
    const question = questions[currentQuestion]
    return (
      <Grid container>
        <Grid item xs={12}>
          <h1> Manage questions </h1>
          <Select name="currentQuestion" value={currentQuestion} displayEmpty onChange={this.selectQuestion} >
            <MenuItem value=''>Select a question to edit</MenuItem>
            {questions.map((question, i) => <MenuItem value={i} key={i}>{question.text}</MenuItem>)}
          </Select>
          <Button color="primary" variant="outlined" onClick={this.addQuestion}>Add question</Button>
          {question ?
            <Grid item xs={5}>
              <Paper>
                <Grid item>
                  <TextField fullWidth name="text" value={question.text} onChange={this.handleEditQuestion} />
                </Grid>
                <Grid item xs={5}>
                  {question.response_options.map((option, i) => (
                    <div key={i}>
                      <TextField
                        key={i}
                        name={String(i)}
                        label={`Option ${i}`}
                        margin="normal"
                        placeholder="option value"
                        value={option.option_value}
                        onChange={this.handleEditQuestion}
                      />
                      <IconButton color="secondary" value={i} onClick={this.handleDelete}>
                        <Delete />
                      </IconButton>
                    </div>
                  ))}
                </Grid>
                <Button color="primary" variant="outlined" onClick={this.handleAddOption}>Add</Button>
                <Button color="primary" variant="outlined" onClick={this.submitQuestion}>Save changes</Button>
              </Paper>
            </Grid>
            : undefined}
        </Grid>
        <Grid item xs={12}>
          <h1> Manage users </h1>
          <Select name="currentUser" value={currentUser} displayEmpty onChange={this.selectQuestion} >
            <MenuItem value=''>Select a user to view</MenuItem>
            {users.map((user, i) => <MenuItem value={i} key={i}>{user.username}</MenuItem>)}
          </Select>
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
