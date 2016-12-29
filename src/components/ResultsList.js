import React from 'react';

import { List, ListItem } from 'material-ui/List';

const ResultsList = (props) => {
  const movies = props.results.map((movie, index) => {
    const releaseYear = movie.release_date.slice(0,4)
    return (
      <ListItem key={movie.id} primaryText={movie.original_title} secondaryText={releaseYear} />
    );
  })
  return (
    <List>
      {movies}
    </List>
  )
}

export default ResultsList;

// const MovieNames = this.state.results.map((movie, index) => {
//       if (index <= 5) {
//         const releaseYear = movie.release_date.slice(0,4)
//         return (
//           <ListItem key={movie.id} primaryText={movie.original_title} secondaryText={releaseYear} />
//         );
//       }
//     });
//     const ResultsList = (
//       <List>{MovieNames}</List>
//     )