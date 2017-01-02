import React from 'react';

import { List, ListItem } from 'material-ui/List';

const ResultsList = (props) => {
  const onClick = (movie) => {
    console.log('From ResultsList Component: ', movie);
    // console.log('Logging props from ResultsList component', props);
    props.onAdd(movie);
  }
  const movies = props.results.map((movie, index) => {
    const releaseYear = movie.release_date.slice(0,4);
    return (
      <ListItem key={movie.id} primaryText={movie.original_title}
        secondaryText={releaseYear} onTouchTap={onClick.bind(this, movie)} />
    );
  })
  return (
    <List>
      {movies}
    </List>
  )
}

export default ResultsList;
