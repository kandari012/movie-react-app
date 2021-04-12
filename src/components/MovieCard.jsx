import React, { Component } from "react";

export class MovieCard extends Component {
  render() {
    const { movie } = this.props;
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
              <button className="favourite-btn">Favourite</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
