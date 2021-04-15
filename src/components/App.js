import React from "react";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies } from "../actions";

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
    const { favourites } = this.props.store.getState();
    const index = favourites.indexOf(movie);
    if (index !== -1) {
      return true;
    }
    return false;
  };
  render() {
    console.log("render");
    const { list } = this.props.store.getState();
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>
          <div className="list">
            {list.map((movie, index) => {
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
      </div>
    );
  }
}

export default App;
