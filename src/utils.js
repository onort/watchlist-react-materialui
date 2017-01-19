import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

export function debounce(fn, delay) {
  let timer = null;
  return function () {
    let context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

export function moveMovie(movies, movieToMove, direction) {
  if ((movieToMove.queue > 0 && direction < 0) ||
			(movieToMove.queue < movies.length-1 && direction > 0)) {
		movies.forEach(movie => {
			if(movie.queue == movieToMove.queue + direction) movie.queue -= direction;
		});
		movies.forEach(movie => {
			if (movie.id == movieToMove.id) movie.queue += direction;
		});
    movies.sort((a,b) => a.queue - b.queue);
	}
	return movies;
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