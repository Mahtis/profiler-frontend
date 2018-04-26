import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GridList, { GridListTile } from 'material-ui/GridList'
import Grow from 'material-ui/transitions/Grow'

class HomePage extends Component {
  constructor() {
    super()

    this.state = { profiles: [] }
  }
  

  componentDidMount() {
    axios.get('http://localhost:8000/').then(data => {
      this.setState({ profiles: data.data })
    })
  }

  render() {
    console.log(this.state.profiles)
    const { profiles } = this.state
    return (
      <div>
        <h1>Hello fello</h1>
        <GridList cellHeight='auto' cols={4}>
          {profiles.map((profile, i) => (
            <Grow in={true}>
              <GridListTile key={profile.id} cols={1}>
                <Link to={`/profiles/${profile.id}`}>
                  <img src={`http://localhost:8000/${profile.thumbnail}`} alt={`profile_${i}`} />
                </Link>
              </GridListTile>
            </Grow>
          ))}
        </GridList>
        {/*this.state.profiles.map((profile, i) => (
          <img src={`http://localhost:8000/${profile.thumbnail}`} alt={`profile_${i}`}  />
        ))*/}
      </div>
    )
  }
}

export default HomePage
