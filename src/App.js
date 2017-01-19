/* eslint-disable no-console, react/jsx-no-bind */
import React, { Component } from 'react';
import * as utils from './utils';

import * as fb from './api/firebaseApi';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Downward from 'material-ui/svg-icons/navigation/arrow-downward';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SortIcon from 'material-ui/svg-icons/content/sort';
import Upward from 'material-ui/svg-icons/navigation/arrow-upward';

import CircularProgress from 'material-ui/CircularProgress';
import Label from 'material-ui/svg-icons/action/label-outline';

import AddMovie from './components/AddMovie';
import GenreDrawer from './components/GenreDrawer';
import Login from './Login';
import Movie from './components/Movie';
import MovieList from './components/MovieList';

const styles = {
  divStyle : {
  maxWidth: 600 + 'px',
  margin: `0 auto`
  },
  progress: {
    position: 'absolute',
    marginLeft: '50%',
    marginTop: '10%',
    left: '-40px',
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      watched: [],
      snack: { open: false, message: '' },
      filteredMovies: [],
      queueChange: false,
      drawerOpen: false,
      loading: true
    };
  this.closeDrawer = this.closeDrawer.bind(this);
  this.handleAdd = this.handleAdd.bind(this);
  this.handleDelete = this.handleDelete.bind(this);
  this.handleDown = this.handleDown.bind(this);
  this.handleGenre = this.handleGenre.bind(this);
  this.handleLogin = this.handleLogin.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
  this.handleRegister = this.handleRegister.bind(this);
  this.handleUp = this.handleUp.bind(this);
  this.openGenreDrawer = this.openGenreDrawer.bind(this);
  this.showAll = this.showAll.bind(this);
  this.snackClose = this.snackClose.bind(this);
  this.updateFirebase = utils.debounce(this.updateFirebase.bind(this), 3000);
  }

  componentDidMount() {
    fb.getAuth().then(user => {
      this.setState({ user });
      if (this.state.user) fb.getData().then(movies => this.setState({ movies, loading:false }));
    }).catch(() => this.setState({ loading: false}));
  }

  handleLogin(email, pass) {
    fb.authUser(email, pass)
      .then(user => {
        this.setState({ user });
        fb.getData().then(movies => this.setState({ movies }));
      })
      .catch(err => console.log(err)); // show error message
  }

  handleLogout() {
    fb.unAuth(),
    this.setState({ user: null });
  }

  handleRegister(email, pass) {
    fb.createUser(email,pass)
      .then(user => {
        console.log(`Created user with uid: ${user.uid}`, user);
        this.setState({ user });
      })
      .catch(err => console.log(err));
  }

  handleAdd(movie) {
    fb.addMovie(movie, this.state.movies).then(movies => {
      const snack = {open: true, message: 'Added to watchlist'};
      this.setState({ movies, snack });
    }).catch(err => {
      const snack = {open: true, message: 'An error occured'};
      this.setState({ snack });
    });
  }

  handleDelete(id) {
    fb.deleteMovie(id, this.state.movies)
      .then(movies => {
        const snack = {open: true, message: 'Movie deleted'};
        const filteredMovies = this.state.filteredMovies.filter(movie => movie.id !== id);
        this.setState({ movies, filteredMovies, snack });
      })
      .catch(err => {
        const snack = {open: true, message: 'Movie deleted'};
        this.setState({ snack });
      });
  }
  
  handleUp(movieToMove) {
    const movies = utils.moveMovie(this.state.movies, movieToMove, -1);
    this.setState({ movies, queueChange: true });
    this.updateFirebase(movies);
  }

  handleDown(movieToMove) {
    const movies = utils.moveMovie(this.state.movies, movieToMove, 1);
    this.setState({ movies, queueChange: true });
    this.updateFirebase(movies);
  }

  updateFirebase() {
    if (this.state.queueChange) fb.update(this.state.movies).then(() => this.setState({ queueChange: false }));
  }

  handleGenre(genre) {
    let filtered = this.state.movies.filter(movie => {
      return movie.genre_ids ? movie.genre_ids.includes(genre) : false;
    });
    this.setState({ filteredMovies: filtered });
  }

  snackClose() {
    const snack = { open: false, message: '' };
    this.setState({ snack });
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
    const { drawerOpen, filteredMovies, loading, movies, user, snack  } = this.state;
    const menu = (
      <div>
        <AddMovie handleAdd={this.handleAdd} />
        <RaisedButton label="Show Genres" onTouchTap={this.openGenreDrawer} /> 
        <GenreDrawer 
          openDrawer={drawerOpen} 
          movies={movies} 
          closeDrawer={this.closeDrawer}
          filterGenre={this.handleGenre}
          showAll={this.showAll} />
        <IconMenu
          iconButtonElement={<IconButton><SortIcon /></IconButton>}
        >
          <MenuItem primaryText="Sort by" />
          <Divider />
          <MenuItem onTouchTap={this.sortByQueue.bind(this, 1)} 
            primaryText="Queue"
            rightIcon={<Downward />} />
          <MenuItem onTouchTap={this.sortByQueue.bind(this, -1)} 
            primaryText="Queue"
            rightIcon={<Upward />} />
          <Divider />
          <MenuItem onTouchTap={this.sortByDate.bind(this, -1)} 
            primaryText="Date Added"
            rightIcon={<Downward />} />
          <MenuItem onTouchTap={this.sortByDate.bind(this, 1)} 
            primaryText="Date Added"
            rightIcon={<Upward />} />
        </IconMenu>
      </div>
    );
    const render = user ? (
      <div>
        <AppBar title="Watchlist"
          iconElementLeft={<IconButton onTouchTap={this.openGenreDrawer}><Label /></IconButton>} 
          iconElementRight={<FlatButton label="Logout" onTouchTap={this.handleLogout}/>}
           />
        <div style={styles.divStyle}>
          {menu}
          <MovieList movies={movies} 
            handleDelete={this.handleDelete}
            handleUp={this.handleUp}
            handleDown={this.handleDown}
            handleGenre={this.handleGenre}
            filteredMovies={filteredMovies}
            />
        </div>
        <Snackbar
          open={snack.open}
          message={snack.message}
          autoHideDuration={2000}
          onRequestClose={this.snackClose}
        />
      </div>
    ) :
     <Login handleLogin={this.handleLogin} handleRegister={this.handleRegister} />;
    return loading ? <CircularProgress style={styles.progress} size={80} thickness={5} /> : render;
  }
}

export default App;