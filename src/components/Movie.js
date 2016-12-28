import React from 'react';

import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import MovieActions from './MovieActions';

const genreList = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Sci-Fi"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

const Movie = (props) => {
  const movie = props.movie;
  const date = movie.release_date.slice(0,4);
  const handleTouchTap = (e) => {
    console.log(e);
  };
  const handleDelete = () => {
    props.onDelete(movie.id);
  };

  const handleUp = () => {
    props.onUp(movie.id);
  };
  const handleDown = () => {
    props.onDown(movie.id);
  };
  const handleTop = () => {
    console.log('Top clicked!')
  };
  const handleBottom = () => {
    console.log('Bottom clicked!')
  };
  const handleNote = () => {
    console.log('Note clicked!')
  };
  const handleWatched = () => {
    props.onWatched(movie);
  }

  const styles = {
    header: {
      backgroundColor: '#e2e2e2'
    },
    title: {
      fontSize: '28px'
    },
    subtitle: {
      fontSize: '18px'
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
      fontSize: '16px',
      lineHeight: 1.3,
      wordSpacing: '1px'
    },
    chipWrap: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 4 + 'px',
    }
  }

  const genres = movie.genre_ids.map(genre => {
    const genreText = genreList.find(genreInfo => genreInfo.id == genre);
    if (genreText) {
      return (
        <Chip key={genre} style={styles.chip} onTouchTap={handleTouchTap}>
          {genreText.name}
        </Chip>
      );
    }
  });
  return (
    <Card initiallyExpanded={false} style={styles.card}> 
      <CardHeader
        title={movie.original_title}
        subtitle={date}
        actAsExpander={false}
        showExpandableButton={true}
        style={styles.header}
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
      />
      <CardText expandable={true}>
        <img style={styles.media} src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} />
        <div style={styles.desc}>
          <p>{movie.overview}</p>
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
        onNote={handleNote}
        onWatched={handleWatched}
        />
    </Card>
  )
}

export default Movie;

