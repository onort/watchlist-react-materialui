import * as firebase from 'firebase';
import {fbConfig} from './config';

firebase.initializeApp(fbConfig);

const dbRef = firebase.database().ref();
const userId = 'firstUser';
const userMoviesRef = dbRef.child(userId).child('watchList');

export const getData = () => {
  return new Promise((resolve, reject) => {
    userMoviesRef.once('value', snap => {
      let snapData = snap.val();
      // Convert Object to Array and sort by queue property
      let watchListData = Object.keys(snapData).map(key => snapData[key]);
      watchListData.sort((a,b) => a.queue - b.queue);
      resolve(watchListData);
    });
  });
}

export const addMovie = (movie) => {
  return new Promise((resolve) => {
    userMoviesRef.push(movie);
    resolve();
  });
}