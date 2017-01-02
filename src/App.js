import React, { Component } from 'react';
import * as firebase from 'firebase';
import {fbConfig} from './api/config';
import * as utils from './utils';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';

import AddMovie from './components/AddMovie';
import Movie from './components/Movie';
import MovieList from './components/MovieList';

firebase.initializeApp(fbConfig);

const dbRef = firebase.database().ref();
const userId = 'firstUser';
const userMoviesRef = dbRef.child(userId).child('watchList');

const styles = {
  divStyle : {
  maxWidth: 600 + 'px',
  margin: `0 auto`
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      watched: [],
      snack: { open: false, message: '' }
    }
  this.handleAdd = this.handleAdd.bind(this);
  this.handleDelete = this.handleDelete.bind(this);
  this.handleDown = this.handleDown.bind(this);
  this.handleUp = this.handleUp.bind(this);
  this.handleWatched = this.handleWatched.bind(this);
  this.snackClose = this.snackClose.bind(this);
  }

  componentDidMount() {
    // Move to FirebaseApi
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
    let snack = {open: true, message: 'Movie deleted'};
    this.setState({ movies, snack });
  }

  handleUp(id) {
    let movies = utils.moveUp(this.state.movies, id);
    this.setState({ movies });
  }

  handleDown(id) {
    let movies = utils.moveDown(this.state.movies, id);
    this.setState({ movies });
  }

  handleWatched(movie) {
    let watched = this.state.watched;
    let isWatched = watched.find(watchedMvoie => watchedMvoie.id === movie.id);
    if (isWatched) {
      return;
    } else {
      movie.markedWatchedOn = Date.now();
      delete movie.queue;
      watched.push(movie);
    }
    let movies = utils.deleteMovie(this.state.movies, movie.id);
    let snack = {open: true, message: 'Marked as watched'};
    this.setState({ watched, movies, snack });
  }

  handleAdd(movie) {
    console.log('Movie to add', movie);
    let snack = {open: true, message: 'Added to watchlist'};
    let movies = this.state.movies;
    let lastQueue;
    movies.length ? lastQueue = movies[movies.length -1].queue : lastQueue = -1
    movie.queue = lastQueue + 1;
    movies.push(movie);
    this.setState({ snack, movies });
  }

  snackClose() {
    const snack = { open: false, message: '' }
    this.setState({ snack })
  }

  render() {
    return (
      <div>
        <AppBar title="Movie Watchlist" />
        <div style={styles.divStyle}>
          <AddMovie handleAdd={this.handleAdd} />

          <MovieList movies={this.state.movies} 
            handleDelete={this.handleDelete}
            handleUp={this.handleUp}
            handleDown={this.handleDown}
            handleWatched={this.handleWatched} />
        </div>
        <Snackbar
          open={this.state.snack.open}
          message={this.state.snack.message}
          autoHideDuration={2000}
          onRequestClose={this.snackClose}
        />
      </div>
    )
  }
}

export default App;