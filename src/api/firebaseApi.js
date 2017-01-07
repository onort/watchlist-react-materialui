import * as firebase from 'firebase';
import {fbConfig} from './config';

firebase.initializeApp(fbConfig);

const auth = firebase.auth();
const dbRef = firebase.database().ref();
let userId;
let userMoviesRef;

function setRefs(uid) {
  userMoviesRef = dbRef.child(uid).child('watchList');
}

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
  return new Promise((resolve, reject) => {
    let lastQueue;
    moviesState.length ? lastQueue = moviesState[moviesState.length -1].queue : lastQueue = -1
    movie.addedAt = Date.now();
    movie.queue = lastQueue + 1;
    userMoviesRef.push(movie).then(getData().then(movies => resolve(movies)))
                             .catch(err => reject(err));
  });
}

export const deleteMovie = (id, moviesState) => {
  return new Promise((resolve, reject) => {
    const delQuery = userMoviesRef.orderByChild('id').equalTo(id);
    const movieToDelete = moviesState.find(movie => movie.id === id)
    moviesState.forEach(movie => {
      if (movie.queue > movieToDelete.queue) movie.queue--;
    });
    delQuery.on('child_added', snap => snap.ref.remove());
    update(moviesState).then(getData().then(movies => resolve(movies)))
                       .catch(err => reject(err));
  });
}

export const update = (movies) => {
  return new Promise(resolve => {
    userMoviesRef.set(movies).then(resolve());
  });
}

export const authUser = (email, pass) => {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(email, pass)
      .then(user => {
        let userUID = auth.currentUser.uid;
        setRefs(userUID);
        resolve(auth.currentUser);
      })
      .catch(err => reject(err));
  });
}

export const createUser = (email, pass) => {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(email, pass)
      .then(user => {
        const userInfo = auth.currentUser;
        dbRef.child(userInfo.uid).set({ watchList: '' });
        resolve(userInfo);
    })
      .catch(err => reject(err));
  });
}

export const unAuth = () => {
  auth.signOut();
  userId = null, userMoviesRef = null;
}

auth.onAuthStateChanged(user => {
  if(user) user;
}) 