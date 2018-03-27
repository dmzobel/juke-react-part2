import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AllAlbums from './AllAlbums';
import SingleAlbum from './SingleAlbum';
import Sidebar from './Sidebar';
import Player from './Player';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';

const NoMatch = ({ location }) => (
  <div>
    <h3>
     {console.log(location)}
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);


export default class Main extends Component {
  render () {
    return (
      <HashRouter>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar deselectAlbum={this.deselectAlbum} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path='/' component={AllAlbums} />
              <Route exact path='/albums' component={AllAlbums} />
              <Route path='/albums/:albumId' component={SingleAlbum} />
              <Route exact path='/artists' component={AllArtists} />
              <Route path='/artists/:artistId' component={SingleArtist} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Player />
        </div>
      </HashRouter>
    );
  }
}

// <SingleAlbum album={this.state.selectedAlbum} />
// <AllAlbums albums={this.state.albums} selectAlbum={this.selectAlbum} />
