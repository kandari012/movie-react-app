import React, { Component } from "react";
import { data } from "../data";
import { handleMovieSearch } from "../actions";

export class Navbar extends Component {
  //every cahnge in the serach bar this fxn will be called
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      showSearchResults: true,
    };
  }
  handleChange = (e) => {
    this.setState({
      searchText: e.target.value, //to get the value entered by user in search bar
    });
  };
  handleSearch = () => {
    const { searchText } = this.state;
    this.props.dispatch(handleMovieSearch(searchText));
  };
  // handleAddMovies = (movie) => {
  //   this.props.dispatch(addMovieToList(movie));
  //   this.setState({
  //     showSearchResults: false,
  //   });
  // };
  render() {
    const { showSearchResults } = this.state;
    return (
      <div className="nav">
        <div className="search-container">
          <input type="text" onChange={this.handleChange} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>

          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={data[0].Poster} alt="search-pic" />
                <div className="movie-info">
                  <span>{data[0].Title}</span>
                  <button>Add to Movies</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
