import * as firebase from 'firebase';
import {fbConfig} from './config';

firebase.initializeApp(fbConfig);

const dbRef = firebase.database().ref();
const userId = 'firstUser';
const userMoviesRef = dbRef.child(userId).child('watchList');

export const getData = () => {
  return new Promise((resolve, reject) => {
    userMoviesRef.on('value', snap => {
      let snapData = snap.val();
      let watchListData = [];
      // Convert Object to Array and sort by queue property
      if (snapData) {
        watchListData = Object.keys(snapData).map(key => snapData[key]);
        watchListData.sort((a,b) => a.queue - b.queue);
      }
      resolve(watchListData);
    });
  });
}

export const addMovie = (movie, moviesState) => {
  return new Promise((resolve) => {
    let lastQueue;
    moviesState.length ? lastQueue = moviesState[moviesState.length -1].queue : lastQueue = -1
    movie.addedAt = Date.now();
    movie.queue = lastQueue + 1;
    userMoviesRef.push(movie).then(getData().then(movies => resolve(movies)));
  });
}

export const deleteMovie = (id) => {
  return new Promise(resolve => {
    const delQuery = userMoviesRef.orderByChild('id').equalTo(id);
    delQuery.on('child_added', snap => snap.ref.remove());
    getData().then(movies => resolve(movies));
  });
}

export const update = (movies) => {
  return new Promise(resolve => {
    console.log('Debounced, updating firebase with movies data', movies)
    userMoviesRef.set(movies).then(resolve());
  });
}