import React from 'react';

import Movie from './Movie';


const MovieList = (props) => {
  const movies = props.movies.map(movie => {
    return <Movie key={movie.id} movie={movie}
            onDelete={props.handleDelete}
            onUp={props.handleUp}
            onDown={props.handleDown} />
  });
  return (
    <div>
      {movies}
    </div>
  )
}

export default MovieList;