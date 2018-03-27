import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import AllAlbums from './AllAlbums'
import Songs from './Songs'
import AlbumView from './AlbumView'

export default class SingleArtist extends Component {
  constructor(props){
    super(props)
    this.state = {
      artist: {},
      songs: [],
      albums: []
    }
  }

  componentDidMount(){
    console.log(this.props.match.params.artistId)
    return Promise.all([
      axios.get(`/api/artists/${this.props.match.params.artistId}`), //[0] //artists
      axios.get(`/api/artists/${this.props.match.params.artistId}/songs`), //[1] //songs
      axios.get(`/api/artists/${this.props.match.params.artistId}/albums`) //[2] //albums
    ])
    .then(response => {
      this.setState({ artist: response[0].data, songs: response[1].data, albums: response[2].data})
      console.log('state', this.state)
    })

    // .then(data => console.log('this should be actual data', data))
    .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
      <h3>{this.state.artist.name}</h3>
        <div>
          <h4>ALBUMS</h4>
          <AlbumView albums={this.state.albums} />
        </div>
        <div>
          <h4>Songs</h4>
          <Songs songs={this.state.songs} />
        </div>
      </div>
    )
  }
}

