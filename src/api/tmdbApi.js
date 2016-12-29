import axios from 'axios';

const TMDbApiKey = require('./config').TMDbApiKey;
const baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDbApiKey}&language=en-US&query=`

const movieApi = {
  searchMovie(query){
    const queryUrl = baseUrl + encodeURI(query);
    console.log('Query URL', queryUrl);
    return axios.get(queryUrl);
  }
  
}

export default movieApi;
  
