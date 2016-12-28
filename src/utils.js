// TODO: refactor moveUp and moveDown to a single move function with an additional direction argument like +1, -1 or a string with a switch statement
export function moveUp(movies, id) {
  let index = movies.findIndex(movie => movie.id === id);
  movies[index-1].queue = movies[index-1].queue + 1
  movies[index].queue = movies[index].queue - 1;
  movies.sort((a,b) => a.queue - b.queue);
  return movies;
}

export function moveDown(movies, id) {
  let index = movies.findIndex(movie => movie.id === id);
  movies[index+1].queue = movies[index+1].queue - 1
  movies[index].queue = movies[index].queue + 1;
  movies.sort((a,b) => a.queue - b.queue);
  return movies;
}

export function deleteMovie(movies, id) {
  let index = movies.findIndex(movie => movie.id === id);
  movies.splice(index, 1);
  // TODO: Delete should update queue properties for other elements
  // update queue props for movies on list
  return movies;
}