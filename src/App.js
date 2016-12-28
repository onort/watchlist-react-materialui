import React, { Component } from 'react';
import * as firebase from 'firebase';
import {fbConfig} from './api/config';

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
  }

  componentDidMount() {
    userMoviesRef.on('value', snap => {
      // Object.keys(obj).map(key => obj[key])
      let watchListData = Object.keys(snap.val()).map(key => snap.val()[key]);
      this.setState({ movies: watchListData })
    })
  }

  render() {
    return (
      <div>
        <AppBar title="Movie Watchlist" />
        <div style={divStyle}>
          <MovieList movies={this.state.movies} />
        </div>
      </div>
    )
  }
}

export default App;