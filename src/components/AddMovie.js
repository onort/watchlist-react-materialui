import React from 'react';

import AddToList from 'material-ui/svg-icons/av/playlist-add';
import IconButton from 'material-ui/IconButton'


const AddMovie = (props) => {

  const handleAdd = () => {
    props.handleAdd();
  }

  const styles = {
    medium: {
    width: 96,
    height: 96,
    padding: 24,
    },
    mediumIcon: {
      width: 48,
      height: 48,
    }
  }

  return (
    <IconButton style={styles.medium} 
      iconStyle={styles.mediumIcon}
      onTouchTap={handleAdd} >
      <AddToList />
    </IconButton>
  )
}

export default AddMovie;