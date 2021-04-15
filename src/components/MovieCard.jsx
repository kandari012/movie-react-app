import React, { Component } from "react";
import { addFavourite } from "../actions";

export class MovieCard extends Component {
  handleFavouriteClick = () => {
    const { movie } = this.props;
    this.props.dispatch(addFavourite(movie));
    console.log(this.props.store.getState());
  };
  handleUnFavouriteClick = () => {
    console.log("hello");
  };
  render() {
    const { movie, isFavourite } = this.props;
    return (
      <div>
        <div className="movie-card">
          <div className="left">
            <img src={movie.Poster} alt="movie-poster" />
          </div>
          <div className="right">
            <div className="title">{movie.Title}</div>
            <div className="plot">{movie.plot}</div>
            <div className="footer">
              <div className="rating">{movie.imdbRating}</div>
              {isFavourite ? (
                <button
                  className="unfavourite-btn"
                  onClick={this.handleUnFavouriteClick}
                >
                  UnFavourite
                </button>
              ) : (
                <button
                  className="favourite-btn"
                  onClick={this.handleFavouriteClick}
                >
                  Favourite
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
