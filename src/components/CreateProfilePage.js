import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import { getQuestions, submitNewProfile } from '../api'

const DEFAULT_PIC = 'http://localhost:8000/img/profile.jpg'

class CreateProfilePage extends Component {
  state = {
    picture: DEFAULT_PIC,
    file: {},
    questions: [],
    curQuestion: '',
    selectedQuestions: [],
    profileQuestions: [],
    crop: {}
  }

  componentDidMount = async ()  => {
    const questions = await getQuestions().then(res => res.data)
    // console.log(questions)
    this.setState({ questions })
  }

  handleChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file && file !== this.state.file) {
      this.setState({ file, picture: window.URL.createObjectURL(file) })
    } else {
      this.setState({ file: {}, picture: DEFAULT_PIC })
    }
  }

  changeCrop = (crop) => {
    this.setState({ crop })
  }

  selectQuestion = (e) => {
    const questionId = e.target.value
    const { selectedQuestions, questions, profileQuestions } = this.state
    const selection = [...selectedQuestions, questions.find(question => question.id === questionId)]
    this.setState({ curQuestion: e.target.value, selectedQuestions: selection, profileQuestions: [...profileQuestions, { questionId }] })
  }

  selectResponse = (e) => {
    const values = e.target.value.split(',')
    const questionId = values[0]
    const optionId = values[1]
    const { selectedQuestions, profileQuestions } = this.state
    // const question = selectedQuestions.find(question => question.id === questionId)
    // const option = question.response_options.find(option => option.id === optionId)
    const k = profileQuestions.find(pq => pq.questionId === questionId)
    k.correctReponse = optionId
    const questions = profileQuestions.filter(q => q.questionId !== questionId)
    // console.log(questions)
    this.setState({ profileQuestions: [...questions, k] })
  }

  submitProfile = (e) => {
    console.log('Creating profile')
    // console.log(this.state)
    if (this.state.picture !== DEFAULT_PIC) {
      let form = new FormData()
      this.state.profileQuestions.forEach(question => form.append(question.questionId, question.correctReponse))
      // form.append('profile_questions', this.state.profileQuestions)
      form.append('picture', this.state.file)
      // const p = { profile_questions: this.state.profileQuestions, picture: this.state.file }
      // Display the key/value pairs
      for(var pair of form.entries()) {
        console.log(pair[0]+ ', '+ pair[1])
      }
      submitNewProfile(form)
    }
  }

  render() {
    const { selectedQuestions, profileQuestions, questions } = this.state
    const availableQuestions = questions.filter(question => !selectedQuestions.find(sq => sq.id === question.id))
    // console.log(profileQuestions)
    return (
      <Grid container>
        <Grid item xs={12}>
          <h1>Create a new profile</h1>
        </Grid>
        <Grid item xs={6}>
          <h2>Select questions and answers</h2>
          <List>
            {selectedQuestions.map(question =>
              <ListItem key={question.id}>
                {question.text}
                <Select
                  value={`${question.id},${profileQuestions.find(q => q.questionId === question.id).correctReponse}`}
                  onChange={this.selectResponse}
                  displayEmpty
                  autoWidth
                >
                  <MenuItem value={`${question.id},undefined`} disabled> Select the correct answer</MenuItem>
                  {question.response_options.map(option => <MenuItem value={`${question.id},${option.id}`} key={option.id}> {option.option_value}</MenuItem>)}
                </Select>
              </ListItem>)}
          </List>
          <Select
            value=""
            onChange={this.selectQuestion}
            displayEmpty
            autoWidth
          >
            <MenuItem value="" disabled>Select a question</MenuItem>
            {availableQuestions.map(question => <MenuItem value={question.id} key={question.id}>{question.text}</MenuItem>)}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <h2>Select the photo</h2>
          <img style={ { width: '500px', height: '600px', objectFit: 'cover' } } src={this.state.picture} alt="Something" />
          <Input type="file" onChange={this.handleChange}/>
        </Grid>
        <div>
          <Button variant="raised" color="primary" onClick={this.submitProfile} >Create profile</Button>
        </div>
      </Grid>
    )
  }
}

export default CreateProfilePage