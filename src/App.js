import React, { Component } from 'react';
import * as utils from './utils';

import * as fb from './api/firebaseApi';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';

import AddMovie from './components/AddMovie';
import Movie from './components/Movie';
import MovieList from './components/MovieList';

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
      snack: { open: false, message: '' },
      filteredMovies: [],
      queueChange: false
    }
  this.handleAdd = this.handleAdd.bind(this);
  this.handleDelete = this.handleDelete.bind(this);
  this.handleDown = this.handleDown.bind(this);
  this.handleGenre = this.handleGenre.bind(this);
  this.handleUp = this.handleUp.bind(this);
  this.handleWatched = this.handleWatched.bind(this);
  this.showAll = this.showAll.bind(this);
  this.snackClose = this.snackClose.bind(this);
  this.updateFirebase = utils.debounce(this.updateFirebase.bind(this), 3000);
  }

  componentDidMount() {
    fb.getData().then(movies => this.setState({ movies }))
  }

  handleAdd(movie) {
    const snack = {open: true, message: 'Added to watchlist'};
    // TODO: add queue prop to movie, or create a ordering node on firebase
    fb.addMovie(movie, this.state.movies).then(movies => this.setState({ movies, snack }));
  }

  handleDelete(id) {
    fb.deleteMovie(id).then(movies => {
      console.log(`Movie with id ${id} removed from firebase database`);
      console.log(`Setting state with data`, movies);
      this.setState({ movies });
    })
  }

  handleUp(id) {
    let movies = utils.moveUp(this.state.movies, id);
    this.setState({ movies, queueChange: true });
    this.updateFirebase(movies);
  }

  handleDown(id) {
    let movies = utils.moveDown(this.state.movies, id);
    this.setState({ movies, queueChange: true });
    this.updateFirebase(movies);
  }

  updateFirebase() {
    if (this.state.queueChange) fb.update(this.state.movies).then(() => this.setState({ queueChange: false }));
  }

  handleWatched(movie) {
    let watched = utils.markWatched(this.state.watched, movie)
    let movies = utils.deleteMovie(this.state.movies, movie.id);
    let snack = {open: true, message: 'Marked as watched'};
    this.setState({ watched, movies, snack });
  }

  handleGenre(genre) {
    let filtered = this.state.movies.filter(movie => movie.genre_ids.includes(genre));
    this.setState({ filteredMovies: filtered});
  }


  snackClose() {
    const snack = { open: false, message: '' }
    this.setState({ snack })
  }

  showAll() {
    this.setState({ filteredMovies: [] });
  }

  render() {
    return (
      <div>
        <AppBar title="Movie Watchlist" />
        <div style={styles.divStyle}>
          <AddMovie handleAdd={this.handleAdd} />
          <FlatButton onTouchTap={this.showAll} label="Show All" disabled={!this.state.filteredMovies.length}/>
          <MovieList movies={this.state.movies} 
            handleDelete={this.handleDelete}
            handleUp={this.handleUp}
            handleDown={this.handleDown}
            handleWatched={this.handleWatched}
            handleGenre={this.handleGenre}
            filteredMovies={this.state.filteredMovies}
            />
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