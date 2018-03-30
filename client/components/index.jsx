import React from 'react'
import ReactDOM from 'react-dom'
import Promise from 'bluebird'
import Description from './description.jsx'
import axios from 'axios'
import dummy from '../../mockData.js'

class Amenities extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: dummy[0]
    }
  }
  componentDidMount() {
    // if (window.location.pathname !== '/') {
    this.fetchInfo()
    // }
  }
  fetchInfo() {
    let id =
      this.props.id || parseInt(window.location.pathname.split('/')[2], 10)
    return new Promise((resolve, reject) => {
      axios
        .get(`http://ec2-54-215-254-173.us-west-1.compute.amazonaws.com:3001/amenities/${id}/amenities`)
        .then(({ data }) => this.setState({ data: data }))
        .then(() => resolve())
        .catch(error => {
          console.log('error', error)
        })
    })
  }
  render() {
    return <Description boat={this.state.data} />
  }
}

// ReactDOM.render(<Amenities />, document.getElementById('Amenities'))
// window.Amenities = App;
export default Amenities
