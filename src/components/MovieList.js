import React, { PropTypes } from 'react';

import Movie from './Movie';


const MovieList = (props) => {
  const filtered = props.filteredMovies.length ? props.filteredMovies : props.movies;
  const movies = filtered.map(movie => {
    return (
      <Movie key={movie.id} movie={movie}
            onDelete={props.handleDelete}
            onUp={props.handleUp}
            onDown={props.handleDown}
            onGenre={props.handleGenre}
            showUpDown={!props.filteredMovies.length} />
    );
  });
  
  return (
    <div>
      {movies}
    </div>
  );
};

MovieList.propTypes = {
  filteredMovies: PropTypes.array,
  movies: PropTypes.array
};

export default MovieList;