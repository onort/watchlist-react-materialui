import axios from 'axios';
import * as config from './config';

const baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${config.TMDbApiKey}&language=en-US&query=`;

const movieApi = {
  searchMovie(query){
    const queryUrl = baseUrl + encodeURI(query);
    return axios.get(queryUrl);
  }
};

export default movieApi;
  
