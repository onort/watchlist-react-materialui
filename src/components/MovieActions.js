import React from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import AVNote from 'material-ui/svg-icons/av/note';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import Watched from 'material-ui/svg-icons/av/playlist-add-check';


const MovieActions = (props) => {
  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURI(props.name + ' trailer')}`;
  const styles = {
    right: {
      float: 'right'
    },
    actions: {
      clear: 'both'
    }
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
  const onTop = () => {
    props.onTop();
  };
  const onBottom = () => {
    props.onBottom();
  };
  const onNote = () => {
    props.onNote();
  };
  const onWatched = () => {
    props.onWatched();
  }
  return (
    <CardActions style={styles.actions}>
      <IconButton onTouchTap={onUp} disabled={!props.showUpDown}>
        <ArrowUp />
      </IconButton>
      <IconButton onTouchTap={onDown} disabled={!props.showUpDown}>
        <ArrowDown />
      </IconButton>
      <IconButton onTouchTap={onWatched}>
        <Watched />
      </IconButton>
      <IconButton onTouchTap={onDelete}>
          <DeleteIcon />
        </IconButton>
      <IconMenu
        iconButtonElement={<IconButton><NavigationMoreHoriz /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem onTouchTap={onTop} primaryText="Move to Top" />
        <MenuItem onTouchTap={onBottom} primaryText="Move to Bottom" />
        <MenuItem onTouchTap={onNote} primaryText="Add Note" />
      </IconMenu>
      <div style={styles.right}>
        <IconButton tooltipPosition="bottom-center" tooltip="Add Note" disabled>
          <AVNote />
        </IconButton>
        <IconButton tooltipPosition="bottom-center" tooltip="Watch Trailer">
          <a href={trailerUrl} target="_blank">
            <AvPlayArrow />
          </a>
        </IconButton>
      </div>
    </CardActions>
  )
}

export default MovieActions;