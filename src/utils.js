import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

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

export function createGenreListWithCount(movies) {
  // this should run if movie added or deleted or marked watched
  let genreList = [];
  movies.forEach(movie => {
    if(movie.genre_ids) {
      movie.genre_ids.forEach(genreId => genreList.push(genreId));
    }
  });
  let genreListWithCount = genreList.reduce((list, genreId) => {
    if(!list[genreId]) list[genreId] = 0;
    list[genreId]++;
    return list;
  }, {});
  return genreListWithCount;
}

export function validateCreds(email, pass, pass2) {
  let errors = { emailError: '', passError: '' };
  if (isEmpty(email) || !isEmail(email)) errors.emailError = 'Please enter a valid email address';
  if (isEmpty(pass)) errors.passError = 'Please enter your password';
  if (pass2 && pass !== pass2) errors.passError = 'Passwords do not match';
  return errors;
}