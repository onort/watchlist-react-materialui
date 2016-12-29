import React, { Component } from 'react';

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
      query: ''
    }

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleAdd() {
    this.props.handleAdd();
  }

  handleClick() {
    console.log('Reporing from AddMvoie: Add clicked');
    this.setState({ addOpen: true })
    // this.handleAdd();
  }
  
  handleClose() {
    this.setState({ addOpen: false });
  }

  handleChange(e) {
    this.setState({ query: e.target.value })
    console.log(this.state.query);
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
        top: '-100px'
      }
    }
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
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
          actions={actions}
          modal={false}
          open={this.state.addOpen}
          onRequestClose={this.handleClose}
          contentStyle={styles.dialog} >
          <TextField hintText="Search for a movie.."
            onChange={this.handleChange}  />
        </Dialog>
      </div>
    )
  }
}

export default AddMovie;