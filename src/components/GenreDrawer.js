/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';

import Badge from 'material-ui/Badge';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { createGenreListWithCount } from '../utils';
import genreIdsInfo from '../genreIds';

const GenreDrawer = (props) => {
  const handleClose = () => props.closeDrawer();
  const handleGenreClick = (id) => {
    props.filterGenre(parseInt(id));
    props.closeDrawer();
  };
  const showAll = () => {
    props.showAll();
    props.closeDrawer();
  };
  const styles = {
    menu: {
      position: 'relative',
      top: '15%',
      width: 'auto'
    }
  };
  const genreListWithCount = createGenreListWithCount(props.movies);
  let realGenreList = [];
  // ?: IS this too expensive?
  for (let prop in genreListWithCount) {
    let info = genreIdsInfo.find(genreIdInfo => genreIdInfo.id == prop);
    genreListWithCount[info.name] = genreListWithCount[prop];
    delete genreListWithCount[prop];
    realGenreList.push(
      <MenuItem key={prop} onTouchTap={handleGenreClick.bind(this, prop)} >
        {info.name} <strong>{genreListWithCount[info.name]}</strong>
        </MenuItem>
      );
  }
  return (
    <Drawer
      docked={false}
      width={200}
      open={props.openDrawer}
      onRequestChange={handleClose}
    >
      <Menu style={styles.menu}>
        <MenuItem key={0} onTouchTap={showAll}>Show All</MenuItem>
        <Divider />
        {realGenreList}
      </Menu>
    </Drawer>
  );
};

GenreDrawer.propTypes = {
  movies: PropTypes.array,
  openDrawer: PropTypes.bool.isRequired
};

export default GenreDrawer;