/* eslint-disable react/jsx-no-bind, react/no-danger */
import React, { PropTypes } from 'react';

import { List, ListItem } from 'material-ui/List';

const ResultsList = (props) => {
  const onClick = (movie) => {
    props.onAdd(movie);
  };
  const movies = props.results.map((movie, index) => {
      const releaseYear = movie.release_date.slice(0,4);
      const title = movie.original_title.replace(new RegExp(props.query, 'gi'), '<strong>$&</strong>');
      // textfield maxlength limited on addmovie comp to avoid any possible injection based attacks
      // http://stackoverflow.com/a/40161952
      return (
        <ListItem key={movie.id} onTouchTap={onClick.bind(this, movie)}>
          <p><span dangerouslySetInnerHTML={{__html: title}} /><small>({releaseYear})</small></p>
        </ListItem>
      );
  });
  return (
    <List>
      {movies}
    </List>
  );
};

ResultsList.propTypes = {
  query: PropTypes.string,
  results: PropTypes.array,
};

export default ResultsList;
