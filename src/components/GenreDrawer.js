import React from 'react';

import Badge from 'material-ui/Badge';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { createGenreListWithCount } from '../utils';
import genreIdsInfo from '../genreIds';

const GenreDrawer = (props) => {
  const handleClose = () => props.closeDrawer();
  const styles = {
    menu: {
      position: 'relative',
      top: '20%'
    }
  }
  const genreListWithCount = createGenreListWithCount(props.movies)
  let realGenreList = []
  // ?: IS this too expensive?
  for (let prop in genreListWithCount) {
    let info = genreIdsInfo.find(genreIdInfo => genreIdInfo.id == prop)
    genreListWithCount[info.name] = genreListWithCount[prop]
    delete genreListWithCount[prop];
    realGenreList.push(<MenuItem key={prop}>{info.name} <strong>{genreListWithCount[info.name]}</strong></MenuItem>)
  }
  return (
    <Drawer
      docked={false}
      width={200}
      open={props.openDrawer}
      onRequestChange={handleClose}
    >
      <Menu style={styles.menu}>
        {realGenreList}
      </Menu>
    </Drawer>
  )
}

export default GenreDrawer