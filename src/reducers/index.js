//always return updated state
//pure reducers fxn
//not changing current state sending the new state to store
export default function movies(state = [], action) {
  // if state is undefined always set it as empty array
  if (action.type === "ADD_MOVIES") {
    return action.movies;
  }
  return state;
}
