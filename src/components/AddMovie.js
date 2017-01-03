import React, { Component } from 'react';
import axios from 'axios';

import {debounce} from '../utils';
import movieApi from '../api/tmdbApi';
import ResultsList from './ResultsList';

import AddToList from 'material-ui/svg-icons/av/playlist-add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addOpen: false,
      query: '',
      results: []
    }

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyUp = debounce(this.handleKeyUp.bind(this), 300);
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleAdd(movie) {
    this.props.handleAdd(movie);
    this.setState({ addOpen: false, results: [], query: '' }); //this.handleClose(won't work)
  }

  handleClick() {
    this.setState({ addOpen: true })
  }
  
  handleClose() {
    this.setState({ addOpen: false, results: [], query: '' });
  }

  handleChange(e) {
    this.setState({ query: e.target.value })
  }


  handleKeyUp(e) {
    if (this.state.query.length > 2) this.handleQuery();
  }

  handleQuery(e) {
    console.log('Query: ', this.state.query);
    let results = movieApi.searchMovie(this.state.query)
      .then(results => {
        this.setState({ results: results.data.results });
        console.log('State updated with ', results.data.results)
      })
      .catch(err => console.log(err));
  }

  render() {
    const styles = {
      medium: {
      width: 96,
      height: 96,
      padding: 24,
      },
      mediumIcon: {
        width: 48,
        height: 48,
      },
      dialog: {
        width: '50%',
        minWidth: '400px',
      },
      title: {
        borderBottom: 'none'
      },
      actions: {
        borderTop: 'none'
      }
    }
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ]
    return (
      <div>
        <IconButton style={styles.medium} 
          iconStyle={styles.mediumIcon}
          onTouchTap={this.handleClick} >
          <AddToList />
        </IconButton>
        <Dialog
          title="Add to Watchlist"
          titleStyle={styles.title}
          actions={actions}
          actionsContainerStyle={styles.actions}
          modal={false}
          open={this.state.addOpen}
          onRequestClose={this.handleClose}
          contentStyle={styles.dialog}
          autoScrollBodyContent={true}
          >
            <TextField hintText="Search for a movie.."
              onChange={this.handleChange}
              onKeyUp={this.handleKeyUp}
              maxLength="50"
              fullWidth={true}
              />
            <ResultsList 
              results={this.state.results} 
              onAdd={this.handleAdd}
              query={this.state.query} />
        </Dialog>
      </div>
    )
  }
}

export default AddMovie;