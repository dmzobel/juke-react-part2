import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import AllAlbums from './AllAlbums';
import Songs from './Songs';
import AlbumView from './AlbumView';

export default class SingleArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: {},
      songs: [],
      albums: []
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.artistId);
    return (
      Promise.all([
        axios.get(`/api/artists/${this.props.match.params.artistId}`), //[0] //artists
        axios.get(`/api/artists/${this.props.match.params.artistId}/songs`), //[1] //songs
        axios.get(`/api/artists/${this.props.match.params.artistId}/albums`) //[2] //albums
      ])
        .then(response => {
          this.setState({
            artist: response[0].data,
            songs: response[1].data,
            albums: response[2].data
          });
          console.log('state', this.state);
        })
        // .then(data => console.log('this should be actual data', data))
        .catch(err => console.error(err))
    );
  }

  render() {
    const artist = this.state.artist;

    return (
      <div>
        <h3>{artist.name}</h3>
        <ul className="nav nav-tabs">
          <li>
            <Link to={`/artists/${artist.id}/albums`}>ALBUMS</Link>
          </li>
          <li>
            <Link to={`/artists/${artist.id}/songs`}>SONGS</Link>
          </li>
        </ul>
        {/* Routes will go here! */}
        <Route
          path={`/artists/${artist.id}/albums`}
          render={() => <AlbumView albums={this.state.albums} />}
        />
        <Route
          path={`/artists/${artist.id}/songs`}
          render={() => <Songs songs={this.state.songs} />}
        />
      </div>
    );
  }
}

// <div className="col-xs-10">
//   <h3>{this.state.artist.name}</h3>
//   <div>
//     <h4>Albums</h4>
//     <AlbumView albums={this.state.albums} />
//   </div>
//   <div>
//     <h4>Songs</h4>
//     <Songs songs={this.state.songs} />
//   </div>
// </div>
