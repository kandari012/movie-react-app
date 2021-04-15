import { ADD_MOVIES } from "../actions";
// converting our state from array to object
const initialMoviesState = {
  list: [],
  favourites: [],
};
//always return updated state
//pure reducers fxn
//not changing current state sending the new state to store
export default function movies(state = initialMoviesState, action) {
  // if state is undefined always set it as empty array
  if (action.type === ADD_MOVIES) {
    //need to return object as stte is object
    return { ...state, list: action.movies };
  }
  return state;
}
