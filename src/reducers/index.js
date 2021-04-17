import { combineReducers } from "redux";
import {
  ADD_MOVIES,
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
  SET_SHOW_FAVOURITE,
  ADD_MOVIE_TO_LIST,
  ADD_SEARCH_RESULT,
} from "../actions";
// converting our state from array to object
const initialMoviesState = {
  list: [],
  favourites: [],
  showFavourites: false,
};
//always return updated state
//pure reducers fxn
//not changing current state sending the new state to store
export function movies(state = initialMoviesState, action) {
  // if state is undefined always set it as empty array

  switch (action.type) {
    case ADD_MOVIES:
      return { ...state, list: action.movies };

    case ADD_FAVOURITE:
      return { ...state, favourites: [action.movie, ...state.favourites] };

    case REMOVE_FAVOURITE:
      const filteredArray = state.favourites.filter(
        (movie) => movie.Title !== action.movie.Title
      );
      return { ...state, favourites: filteredArray };

    case SET_SHOW_FAVOURITE:
      return { ...state, showFavourites: action.val };

    case ADD_MOVIE_TO_LIST:
      return { ...state, list: [action.movie, ...state.list] };

    default:
      return state;
  }
}
// default state for search
const initialSearchState = {
  result: {},
  showSearchResults: false,
};

export function search(state = initialSearchState, action) {
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return { ...state, result: action.movie, showSearchResults: true };

    case ADD_MOVIE_TO_LIST:
      return { ...state, showSearchResults: false };

    default:
      return state;
  }
}
// default state for root
const initialRootState = {
  movies: initialMoviesState,
  search: initialSearchState,
};

//call both reducers from root
// pass root to store
// on each dispatch root will be called ,so both reducers will also be called
// export default function rootReducer(state = initialRootState, action) {
//   return {
//     movies: movies(state.movies, action),// calling movie reducer to update movie
//     search: search(state.search, action),// calling search reducer to update movie
//   };
// }

// on background it will do same as root Reducers
export default combineReducers({
  movies, //movies(state property):movies(reducer managing that)
  search,
});
