import React, { Component } from 'react';
import * as utils from './utils';

import * as fb from './api/firebaseApi';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Downward from 'material-ui/svg-icons/navigation/arrow-downward';
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SortIcon from 'material-ui/svg-icons/content/sort';
import Upward from 'material-ui/svg-icons/navigation/arrow-upward';

import AddMovie from './components/AddMovie';
import GenreDrawer from './components/GenreDrawer';
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
      queueChange: false,
      drawerOpen: false
    }
  this.handleAdd = this.handleAdd.bind(this);
  this.handleDelete = this.handleDelete.bind(this);
  this.handleDown = this.handleDown.bind(this);
  this.handleGenre = this.handleGenre.bind(this);
  this.handleUp = this.handleUp.bind(this);
  this.openGenreDrawer = this.openGenreDrawer.bind(this);
  this.showAll = this.showAll.bind(this);
  this.snackClose = this.snackClose.bind(this);
  this.updateFirebase = utils.debounce(this.updateFirebase.bind(this), 3000);
  }

  componentDidMount() {
    fb.getData().then(movies => this.setState({ movies }))
  }

  handleAdd(movie) {
    const snack = {open: true, message: 'Added to watchlist'};
    fb.addMovie(movie, this.state.movies).then(movies => this.setState({ movies, snack }));
  }

  handleDelete(id) {
    fb.deleteMovie(id, this.state.movies).then(movies => this.setState({ movies }));
  }

  handleUp(id) {
    const movies = utils.moveUp(this.state.movies, id);
    this.setState({ movies, queueChange: true });
    this.updateFirebase(movies);
  }

  handleDown(id) {
    const movies = utils.moveDown(this.state.movies, id);
    this.setState({ movies, queueChange: true });
    this.updateFirebase(movies);
  }

  updateFirebase() {
    if (this.state.queueChange) fb.update(this.state.movies).then(() => this.setState({ queueChange: false }));
  }

  handleGenre(genre) {
    let filtered = this.state.movies.filter(movie => {
      return movie.genre_ids ? movie.genre_ids.includes(genre) : false
    });
    this.setState({ filteredMovies: filtered });
  }

  snackClose() {
    const snack = { open: false, message: '' }
    this.setState({ snack })
  }

  showAll() {
    this.setState({ filteredMovies: [] });
  }

  sortByDate(direction) {
    let movies = this.state.movies.sort((a, b) => direction * (a.addedAt - b.addedAt));
    this.setState({ movies });
  }

  sortByQueue(direction) {
    let movies = this.state.movies.sort((a, b) => direction * (a.queue - b.queue));
    this.setState({ movies });
  }

  openGenreDrawer() {
    this.setState({ drawerOpen: true });
  }

  closeDrawer() {
    this.setState({ drawerOpen: false });
  }

  render() {
    const menu = (
      <div>
        <AddMovie handleAdd={this.handleAdd} />
        <RaisedButton label="Show Genres" onTouchTap={this.openGenreDrawer} /> 
        <GenreDrawer 
          openDrawer={this.state.drawerOpen} 
          movies={this.state.movies} 
          closeDrawer={this.closeDrawer.bind(this)}
          filterGenre={this.handleGenre}
          showAll={this.showAll} />
        <IconMenu
          iconButtonElement={<IconButton><SortIcon /></IconButton>}
        >
          <MenuItem primaryText="Sort by" />
          <Divider />
          <MenuItem onTouchTap={this.sortByDate.bind(this, -1)} 
            primaryText="Date Added"
            rightIcon={<Downward />} />
          <MenuItem onTouchTap={this.sortByDate.bind(this, 1)} 
            primaryText="Date Added"
            rightIcon={<Upward />} />
          <Divider />
          <MenuItem onTouchTap={this.sortByQueue.bind(this, 1)} 
            primaryText="Queue"
            rightIcon={<Downward />} />
          <MenuItem onTouchTap={this.sortByQueue.bind(this, -1)} 
            primaryText="Queue"
            rightIcon={<Upward />} />
        </IconMenu>
      </div>
    )
    return (
      <div>
        <AppBar title="Movie Watchlist" />
        <div style={styles.divStyle}>
          {menu}
          <MovieList movies={this.state.movies} 
            handleDelete={this.handleDelete}
            handleUp={this.handleUp}
            handleDown={this.handleDown}
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