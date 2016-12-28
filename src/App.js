import React, { Component } from 'react';
import * as firebase from 'firebase';
import {fbConfig} from './api/config';
import * as utils from './utils';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon';

import Movie from './components/Movie';
import MovieList from './components/MovieList';

firebase.initializeApp(fbConfig);

const dbRef = firebase.database().ref();
const userId = 'firstUser';
const userMoviesRef = dbRef.child(userId).child('watchList');

const divStyle = {
  maxWidth: 600 + 'px',
  margin: `0 auto`
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    }
  this.handleDelete = this.handleDelete.bind(this);
  this.handleUp = this.handleUp.bind(this);
  this.handleDown = this.handleDown.bind(this);
  }

  componentDidMount() {
    userMoviesRef.once('value', snap => {
      let snapData = snap.val();
      // Convert Object to Array and sort by queue property
      let watchListData = Object.keys(snapData).map(key => snapData[key]);
      watchListData.sort((a,b) => a.queue - b.queue);
      this.setState({ movies: watchListData })
    })
  }

  handleDelete(id) {
    let movies = utils.deleteMovie(this.state.movies, id);
    // TODO: Delete should update queue properties for other elements
    this.setState({ movies });
  }

  handleUp(id) {
    let movies = utils.moveUp(this.state.movies, id);
    this.setState({ movies });
  }

  handleDown(id) {
    let movies = utils.moveDown(this.state.movies, id);
    this.setState({ movies });
  }

  render() {
    return (
      <div>
        <AppBar title="Movie Watchlist" />
        <div style={divStyle}>
          <MovieList movies={this.state.movies} 
            handleDelete={this.handleDelete}
            handleUp={this.handleUp}
            handleDown={this.handleDown} />
        </div>
      </div>
    )
  }
}

export default App;