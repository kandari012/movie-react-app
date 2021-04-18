import React from "react";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";

import { storeContext } from "../index";
import { data } from "../data";

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;

    // will be called when our state changes subscribing to the store chnages
    // after dispatched it will be called imidiately
    store.subscribe(() => {
      console.log("updated");
      this.forceUpdate(); // forcefullu update the comp as after state change no rerener so no chnages showing on the UI
    });

    //make api call
    //dispatch action
    store.dispatch(addMovies(data));
    console.log("state", store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();
    const index = movies.favourites.indexOf(movie); // will return index if movie exist else -1
    if (index !== -1) {
      return true;
    }
    return false;
  };
  onTabChange = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
    console.log(this.props.store.getState());
  };
  render() {
    console.log("render");
    const { movies, search } = this.props.store.getState(); //{movie:{},search:{}}
    const { list, favourites, showFavourites } = movies;
    const displayMovies = showFavourites ? favourites : list; //will diaplay fav or movies depend on show movie ,true or false

    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.onTabChange(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.onTabChange(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => {
              // willgive index of each entry
              return (
                <MovieCard
                  movie={movie}
                  key={`movies-${index}`}
                  dispatch={this.props.store.dispatch}
                  isFavourite={this.isMovieFavourite(movie)}
                  store={this.props.store}
                />
              );
            })}
          </div>
        </div>
        {/* { show no movies if no movie in favourites} */}
        {displayMovies.length === 0 ? (
          <div className="no-movies">No Movies to display</div>
        ) : null}
      </div>
    );
  }
}

// if not using store or dispatch in component methods can directly use consumer in component else use wrapper
// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <storeContext.Consumer>
//         {(store) => <App store={store} />}
//       </storeContext.Consumer>
//     );
//   }
// }

//callback fxn tells waht dat we want to be passed to the component from store
function callback(state) {
  return {
    movies: state.movies,
    search: state.search,
  };
}
// assuming that the connect fxn will call the callback with the redux state
const connectedAppComponent = connect(callback)(App); // connect fxn will return another fxn we will pass the componenet in which we want the argumnets
export default connectedAppComponent;
