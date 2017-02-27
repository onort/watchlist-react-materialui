## Materail UI Watchlist App

### [Live Demo](https://react-materialui-watchlist.firebaseapp.com/)

This is a single page watchlist app built with [React](https://facebook.github.io/react/), [Firebase](https://firebase.google.com/) and [Material UI](http://www.material-ui.com/#/) as challange to create a React App without a state management library (which prove to be very hard to endure) and a learning project for Material UI.

Movie infos and posters are fetched from [The Movie Database](https://www.themoviedb.org/) API and watchlist data is stored on Firebase.

To check demo app out you can either create an account with an email and 6 characters password, or simply login to demo account:

```
email: demo@demo.com
pasword demo1234
```
You can try demo locally with your own firebase and the movie database account details.

``` javascript
// ./src/api/config.js
export const fbConfig = {
  apiKey: 
  authDomain:
  databaseURL:
  storageBucket:
  messagingSenderId:
};

export const TMDbApiKey = <YourAPIKey>;
```