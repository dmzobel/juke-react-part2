//"AllAlbum view"

import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import AlbumView from './AlbumView'

export default class AllAlbums extends Component {
  constructor (props) {
    super(props);
    this.state = {
      albums: []
    };
  }

  componentDidMount () {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(albums => {
        this.setState({ albums })
      });
  }

  render () {
    const albums = this.state.albums;

    return (
      <div className="col-xs-10">
        <h3>Albums</h3>
        <AlbumView albums={this.state.albums} />
      </div>
    );
  }
}
