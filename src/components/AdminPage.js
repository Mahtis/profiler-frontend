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
    currentQuestion: { id: 0 },
    editedQuestions: [],
    users: [],
    currentUser: '',
    questionId: 0
  }

  componentDidMount() {
    getQuestions().then(res => this.setState({ questions: res.data }))
    getUsers().then(res => this.setState({ users: res.data }))
  }

  selectQuestion = (e) => {
    const currentQuestion = this.state.editedQuestions.find(q => q.id === e.target.value) || this.state.questions.find(q => q.id === e.target.value)
    console.log('current question', currentQuestion)
    this.setState({ currentQuestion })
  }

  handleEditQuestion = async (e) => {
    const { currentQuestion, questions } = this.state
    const editedQuestions = [...this.state.editedQuestions]
    if (!editedQuestions.find(q => q.id === currentQuestion.id)) {
      const editQuestion = { ...questions.find(q => q.id === currentQuestion.id) }
      // spread only makes a shallow copy, so need to spread each option object individually
      editQuestion.response_options = editQuestion.response_options.map(o => ({ ...o }))
      editedQuestions.push(editQuestion)
      // return this.setState({ : editQuestion, editedQuestions })
    }
    const question = editedQuestions.find(q => q.id === currentQuestion.id)
    if (e.target.name === 'text') {
      question.text = e.target.value
    } else {
      question.response_options[e.target.name].option_value = e.target.value
      console.log(question.response_options[e.target.name])
    }
    console.log('edited question', question)
    this.setState({ currentQuestion: question, editedQuestions })
  }

  handleEditRole = (e) => {
    const { currentUser } = this.state
    const users = [...this.state.users]
    const user = users[currentUser]
    user.role = e.target.value
    this.setState({ users })
  }

  handleDelete = (e) => {
    const questions = [...this.state.questions]
    const question = questions[this.state.currentQuestion]
    question.response_options.splice([e.currentTarget.value], 1)
    this.setState({ questions })
  }

  addQuestion = (e) => {
    const editedQuestions = [...this.state.editedQuestions]
    editedQuestions.push({ id: this.state.questionId, text: 'Question text', response_options: [] })
    this.setState({ editedQuestions, questionId: this.state.questionId - 1 })
  }

  handleAddOption = (e) => {
    const { currentQuestion } = this.state
    const questions = [...this.state.questions]
    const question = questions[currentQuestion]
    question.response_options.push({ question_id: question.id, option_value: '' })
    this.setState({ questions })
  }

  handleCancel = (e) => {
    const { currentQuestion, questions, editedQuestions } = this.state
    const filtered = editedQuestions.filter(q => q !== currentQuestion)
    const question = questions.find(q => q.id === currentQuestion.id)
    this.setState({ editedQuestions: filtered, currentQuestion: question })
  }

  submitQuestion = (e) => {
    console.log('send question')
    this.setState({ currentQuestion: '' })
  }

  submitUser = (e) => {
    console.log('send user')
    this.setState({ currentUser: '' })
  }

  cancelSelection = selection => () => {
    this.setState({ [selection]: '' })
  }

  render() {
    console.log(this.state)
    const { editedQuestions, questions, currentQuestion, users, currentUser } = this.state
    const question = currentQuestion || { id: 0 }
    const user = users[currentUser]
    const unedited = questions.filter(q => !editedQuestions.find(eq => eq.id === q.id))
    return (
      <Grid container>
        <Grid item xs={12}>
          <h1> Manage questions </h1>
          <Select name="currentQuestion" value={question.id} displayEmpty onChange={this.selectQuestion} >
            <MenuItem value={0}>Select a question to edit</MenuItem>
            {editedQuestions.map(question => <MenuItem style={{ color: 'red' }} value={question.id} key={question.id}>{question.text}</MenuItem>)}
            {unedited.map(question => <MenuItem value={question.id} key={question.id}>{question.text}</MenuItem>)}
          </Select>
          <Button color="primary" variant="outlined" onClick={this.addQuestion}>Add question</Button>
          {question && question.id ?
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
                <Button color="secondary" variant="outlined" onClick={this.handleCancel}>Cancel changes</Button>
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
          {user ?
            <Grid item xs={5}>
              <Paper>
                <Grid item>
                  <p>username: {user.username}</p>
                  <p>email: {user.email}</p>
                  <p>role: </p><TextField name="text" value={user.role} onChange={this.handleEditRole} />
                </Grid>
                <Button color="primary" variant="outlined" onClick={this.submitUser}>Save changes</Button>
                <Button color="secondary" variant="outlined" onClick={this.cancelSelection('currentUser')}>cancel</Button>
              </Paper>
            </Grid>
            : undefined}
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
