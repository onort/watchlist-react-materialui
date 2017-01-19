import React, { PropTypes } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreIcon from 'material-ui/svg-icons/navigation/more-horiz';


const MovieActions = (props) => {
  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURI(props.name + ' trailer')}`;
  const styles = {
    right: {
      float: 'right'
    },
    actions: {
      clear: 'both'
    }
  };
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
  return (
    <CardActions style={styles.actions}>
      <IconButton onTouchTap={onUp} disabled={!props.showUpDown}>
        <ArrowUp />
      </IconButton>
      <IconButton onTouchTap={onDown} disabled={!props.showUpDown}>
        <ArrowDown />
      </IconButton>
      <IconButton onTouchTap={onDelete}>
          <DeleteIcon />
        </IconButton>
      <IconMenu
        iconButtonElement={<IconButton><MoreIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem onTouchTap={onTop} disabled primaryText="Move to Top" />
        <MenuItem onTouchTap={onBottom} disabled primaryText="Move to Bottom" />
      </IconMenu>
      <div style={styles.right}>
        <IconButton tooltipPosition="bottom-center" tooltip="Watch Trailer">
          <a href={trailerUrl} target="_blank">
            <AvPlayArrow />
          </a>
        </IconButton>
      </div>
    </CardActions>
  );
};

MovieActions.propTypes = {
  name: PropTypes.string.isRequired,
  onBottom: PropTypes.func.isRequired,
  showUpDown: PropTypes.bool.isRequired
};

export default MovieActions;