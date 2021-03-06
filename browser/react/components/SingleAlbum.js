import React, { Component } from 'react';
import Songs from '../components/Songs';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Mailto from 'react-mailto'

export default class SingleAlbum extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedAlbum: {}
    };
  }

  componentDidMount () {
    axios.get(`/api/albums/${this.props.match.params.albumId}`)
      .then(res => res.data)
      .then(selectedAlbum => {
        this.setState({ selectedAlbum })
      });
  }

  // selectAlbum (albumId) {
  //   axios.get(`/api/albums/${albumId}`)
  //     .then(res => res.data)
  //     .then(album => this.setState({
  //       selectedAlbum: album
  //     }));
  // }

  // deselectAlbum () {
  //   this.setState({ selectedAlbum: {}});
  // }

  render () {
    console.log(this.props);
    const album = this.state.selectedAlbum;

    return (
      <div className="album">
        <div>
          <h3>{ album.name }
            <button className="btn btn-default btn-xs">
              <Mailto email='' headers={{
                subject: `Fire beats from ${album.name}`

              }}
                 obfuscate={true} >
                <span className="glyphicon glyphicon-envelope" />
              </Mailto>
            </button>
          </h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
