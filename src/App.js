import React from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon';


import Movie from './components/Movie';
import MovieList from './components/MovieList';

const movies = [
  {
      "poster_path": "/2ljPzzKD6h3SZnmcGWR9iIgO7FA.jpg",
      "adult": false,
      "overview": "Everyone knows what to do if one morning the sky would be absolutely full of UFOs: run as fast as you can. However, what would happen if the invasion started while you are in the flat of the girl of your dreams, the one you have just met?",
      "release_date": "2011-09-11",
      "genre_ids": [
        18,
        35,
        878,
        10749,
        10769
      ],
      "id": 76333,
      "original_title": "Extraterrestre",
      "original_language": "es",
      "title": "Extraterrestrial",
      "backdrop_path": "/xnSMSBo4wwtPYbZHrixwDeMAIk5.jpg",
      "popularity": 1.358698,
      "vote_count": 10,
      "video": false,
      "vote_average": 4.4
    },
    {
      "poster_path": "/4Iu5f2nv7huqvuYkmZvSPOtbFjs.jpg",
      "adult": false,
      "overview": "Taking place after alien crafts land around the world, an expert linguist is recruited by the military to determine whether they come in peace or are a threat.",
      "release_date": "2016-11-10",
      "genre_ids": [
        18,
        878
      ],
      "id": 329865,
      "original_title": "Arrival",
      "original_language": "en",
      "title": "Arrival",
      "backdrop_path": "/yIZ1xendyqKvY3FGeeUYUd5X9Mm.jpg",
      "popularity": 51.91734,
      "vote_count": 782,
      "video": false,
      "vote_average": 6.5
    },
    {
      "poster_path": "/xg9EXz9SPJMxnnIMC4f9r8m5izr.jpg",
      "adult": false,
      "overview": "Two middle-aged men embark on a spiritual journey through Californian wine country. One is an unpublished novelist suffering from depression, and the other is only days away from walking down the aisle.",
      "release_date": "2004-10-22",
      "genre_ids": [
        35,
        18,
        10749
      ],
      "id": 9675,
      "original_title": "Sideways",
      "original_language": "en",
      "title": "Sideways",
      "backdrop_path": "/ow0sx3Sk2BvbtpYMXwAQRNMdIMW.jpg",
      "popularity": 1.897624,
      "vote_count": 235,
      "video": false,
      "vote_average": 6.6
    },
    {
      "poster_path": "/pSRi8yXxCyJaFkWi3xtdDNVtxBD.jpg",
      "adult": false,
      "overview": "A cattle herder and his family who reside in the dunes of Timbuktu find their quiet lives -- which are typically free of the Jihadists determined to control their faith -- abruptly disturbed. A look at the brief occupation of Timbuktu by militant Islamic rebels.",
      "release_date": "2014-12-10",
      "genre_ids": [
        18
      ],
      "id": 265228,
      "original_title": "Timbuktu",
      "original_language": "fr",
      "title": "Timbuktu",
      "backdrop_path": "/zOQmy7N2agM3vBxKdBCPYGuyFRy.jpg",
      "popularity": 1.545417,
      "vote_count": 95,
      "video": false,
      "vote_average": 6.9
    },
    {
    "poster_path": "/khJaULBHdhmxNgyyew6fd4kr5T0.jpg",
    "adult": false,
    "overview": "13-year-old Sinikka vanishes on a hot summer night. Her bicycle is found in the exact place where a girl was killed 23 years ago. The dramatic present forces those involved in the original case to face their past.",
    "release_date": "2010-08-13",
    "genre_ids": [
      80,
      18,
      53
    ],
    "id": 60534,
    "original_title": "Das letzte Schweigen",
    "original_language": "de",
    "title": "The Silence",
    "backdrop_path": "/gEyUbit2EtQwstGWoKDDyyhfOZs.jpg",
    "popularity": 1.395654,
    "vote_count": 17,
    "video": false,
    "vote_average": 6.4
  },
  {
    "poster_path": "/8qc4aWkYJVXaWcypDusuudnME18.jpg",
    "adult": false,
    "overview": "Six short stories that explore the extremities of human behavior involving people in distress.",
    "release_date": "2014-08-21",
    "genre_ids": [
      18,
      53,
      35
    ],
    "id": 265195,
    "original_title": "Relatos salvajes",
    "original_language": "es",
    "title": "Wild Tales",
    "backdrop_path": "/eRt2Dow7PxWBr4IbkO29j0tR0da.jpg",
    "popularity": 2.194893,
    "vote_count": 549,
    "video": false,
    "vote_average": 7.8
  }
]

const divStyle = {
  maxWidth: 600 + 'px',
  margin: `0 auto`
}

const App = () => {
  return (
    <div>
      <AppBar
        title="Movie Watchlist"
      />
      <div style={divStyle}>
        <MovieList movies={movies} />
      </div>
    </div>
  )
}

export default App;