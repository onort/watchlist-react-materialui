/* eslint-disable no-console, react/jsx-no-bind */
import React, { PropTypes } from 'react';
import moment from 'moment';

import AddedAt from 'material-ui/svg-icons/content/add-circle-outline';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import MovieActions from './MovieActions';
import genreList from '../genreIds';

const Movie = (props) => {
  const movie = props.movie;
  const date = movie.release_date.slice(0,4);
  const handleGenreClick = (genre) => {
    props.onGenre(genre);
  };
  const handleDelete = () => {
    const checkConfirm = confirm(`Are you sure you want to delete ${movie.original_title} from your watchlist?`);
    checkConfirm && props.onDelete(movie.id);
  };

  const handleUp = () => {
    props.onUp(movie);
  };
  const handleDown = () => {
    props.onDown(movie);
  };
  const handleTop = () => {
    console.log('Top clicked!');
  };
  const handleBottom = () => {
    console.log('Bottom clicked!');
  };

  const styles = {
    header: {
      backgroundColor: '#e2e2e2',
      padding: '8px 12px'
    },
    title: {
      fontSize: '24px'
    },
    subtitle: {
      fontSize: '14px'
    },
    card: {
      marginTop: 36 + 'px',
    },
    media: {
      maxWidth: '185px',
      float: 'left'
    },
    desc: {
      width: '60%',
      float: 'right',
      minHeight: '280px',
      letterSpacing: '.5px',
      fontSize: '14px',
      lineHeight: '1.4em',
    },
    chipWrap: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 4 + 'px',
    },
    queue: {
      position: 'absolute',
      left: '-72px',
      top: '28px',
      fontSize: '14px',
      color: 'rgba(66, 66, 66, .87)'
    },
    root: {
      position: 'relative'
    }
  };

  const genres = movie.genre_ids ? movie.genre_ids.map(genre => {
    const genreText = genreList.find(genreInfo => genreInfo.id == genre);
    if (genreText) {
      return (
        <Chip key={genre} style={styles.chip} onTouchTap={handleGenreClick.bind(this, genre)}>
          {genreText.name}
        </Chip>
      );
    }
  }) : '';
  return (
    <div style={styles.root}>
    <FloatingActionButton style={styles.queue} backgroundColor="#e2e2e2" zDepth={1}>
      #{movie.queue + 1}
    </FloatingActionButton>
    <Card initiallyExpanded={false} style={styles.card}>
      <CardHeader
        title={movie.original_title}
        subtitle={date}
        actAsExpander
        showExpandableButton
        style={styles.header}
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
      />
      <CardText expandable>
        <img style={styles.media} src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} />
        <div style={styles.desc}>
          <p>{movie.overview}</p>
          <p><AddedAt /> {moment(movie.addedAt).from()}</p>
          <div style={styles.chipWrap}>
            {genres}
          </div>
        </div>
      </CardText>    
      <MovieActions 
        name={movie.original_title}
        onDelete={handleDelete}
        onUp={handleUp}
        onDown={handleDown}
        onTop={handleTop}
        onBottom={handleBottom}
        showUpDown={props.showUpDown}
        />
    </Card>
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  showUpDown: PropTypes.bool.isRequired
};

export default Movie;

