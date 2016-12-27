import React from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';


const MovieActions = (props) => {
  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURI(props.name + ' trailer')}`;
  const alignRight = {
    float: 'right'
  }
  const onDelete = (e) => {
    props.onDelete(e);
  };
  const onUp = () => {
    props.onUp();
  };
  const onDown = () => {
    props.onDown();
  };
  return (
    <CardActions>
      <IconButton onTouchTap={onUp}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
      </IconButton>
      <IconButton onTouchTap={onDown}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>
      </IconButton>
      <IconButton onTouchTap={onDelete}>
          <i className="material-icons">delete_forever</i>
        </IconButton>
      <IconMenu
        iconButtonElement={<IconButton><NavigationMoreHoriz /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem primaryText="Move to Top" />
        <MenuItem primaryText="Move to Bottom" />
        <MenuItem primaryText="Add Note" />
      </IconMenu>
      <div style={alignRight}>
        <IconButton tooltipPosition="bottom-center" tooltip="Watch Trailer">
          <a href={trailerUrl} target="_blank">
            <i className="material-icons">add_to_queue</i>
          </a>
        </IconButton>
        <IconButton tooltipPosition="bottom-center" tooltip="Watch Trailer">
          <img src="/img/imdb24.png" />
        </IconButton>
      </div>
    </CardActions>
  )
}

export default MovieActions;