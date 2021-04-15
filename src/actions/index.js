//in code a ation is simply a JS object where we have to pass the type and can also pass any other data
// it is a way of telling the store that i want to do someting
// will be passed to reducer
// {
//   type: "ADD_MOVIES"; //will twll what action need to do
//   movies:;
// }

//action types
export const ADD_MOVIES = "ADD_MOVIES";

//action creators
export function addMovies(movies) {
  return {
    type: "ADD_MOVIES",
    movies: movies,
  };
}
