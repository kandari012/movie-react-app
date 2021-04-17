//in code a ation is simply a JS object where we have to pass the type and can also pass any other data
// it is a way of telling the store that i want to do someting
// will be passed to reducer
// {
//   type: "ADD_MOVIES"; //will twll what action need to do
//   movies:;
// }

//action types
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";
export const SET_SHOW_FAVOURITE = "SET_SHOW_FAVOURITE";
export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";
export const ADD_SEARCH_RESULT = "ADD_SEARCH_RESULT";
//action creators
export function addMovies(movies) {
  return {
    type: ADD_MOVIES,
    movies: movies,
  };
}

export function addFavourite(movie) {
  return {
    type: ADD_FAVOURITE,
    movie: movie,
  };
}

export function removeFavourite(movie) {
  return {
    type: REMOVE_FAVOURITE,
    movie: movie,
  };
}

export function setShowFavourites(val) {
  return {
    type: SET_SHOW_FAVOURITE,
    val,
  };
}
export function addMovieToList(movie) {
  return {
    type: ADD_MOVIE_TO_LIST,
    movie,
  };
}
// fething movie and adding it to reducers
// action cretaors are sync in natire and return a object
//wrapping fxn around another fxn to get the access of dispatch
export function handleMovieSearch(movie) {
  const url = `http://www.omdbapi.com/?apikey=3ca5df7&t=${movie}`;
  return function (dispatch) {
    //fetch request is async call
    fetch(url) // will return promise
      .then((response) => response.json())
      .then((movie) => {
        console.log(movie);
        //dispatch an action
        dispatch(addMovieSearchResult(movie));
      });
  };
}

export function addMovieSearchResult(movie) {
  return {
    type: ADD_SEARCH_RESULT,
    movie,
  };
}
