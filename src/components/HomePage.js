import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Grow from '@material-ui/core/Grow'

import { getUserAction } from '../actions/actions'
import { getProfiles } from '../api'
import { BASE_PATH } from '../util'

class HomePage extends Component {
  constructor() {
    super()

    this.state = { profiles: [] }
  }

  componentDidMount = async () => {
    getProfiles().then(res => this.setState({ profiles: res.data }))
    // axios.get('http://localhost:8000/api/').then(data => {
    //   this.setState({ profiles: data.data })
    // })
  }

  render() {
    //console.log(this.props.user)
    //console.log(this.state.profiles)
    const { profiles } = this.state
    return (
      <div>
        <h1>Hello fella</h1>
        <GridList cellHeight='auto' cols={4}>
          {profiles.map((profile, i) => (
            <Grow in={true}>
              <GridListTile key={profile.id} cols={1}>
                <Link to={`/profiles/${profile.id}`}>
                  <img src={`${BASE_PATH}/${profile.thumbnail}`} alt={`profile_${i}`} />
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

const mapDispatchToProps = (dispatch) => ({
  dispatchGetUser: () =>
    dispatch(getUserAction())
})

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
