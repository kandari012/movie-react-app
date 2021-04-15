import {
  ADD_MOVIES,
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
  SET_SHOW_FAVOURITE,
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
export default function movies(state = initialMoviesState, action) {
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

    default:
      return state;
  }
}
