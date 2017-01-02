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
  movies = updateQueuePropAfterDel(movies, id);
  movies.splice(index, 1);
  return movies;
}

function updateQueuePropAfterDel(movies, id) {
  let deleteIndex = movies.findIndex(movie => movie.id === id)
  movies.forEach((movie, index) => {
    if (index > deleteIndex) movie.queue--;
  });
  return movies;
}

export function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}