import React from 'react';

import Movie from './Movie';


const MovieList = (props) => {
  const movies = props.movies.map(movie => <Movie key={movie.id} movie={movie} />)
  return (
    <div>
      {movies}
    </div>
  )
}

export default MovieList;