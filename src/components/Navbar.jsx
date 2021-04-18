import React, { Component } from "react";
import { handleMovieSearch, addMovieToList } from "../actions";
import { connect } from "../index";

export class Navbar extends Component {
  //every cahnge in the serach bar this fxn will be called
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
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
  handleAddMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
  };
  render() {
    const { result: movie, showSearchResults } = this.props.search;
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
                <img src={movie.Poster} alt="search-pic" />
                <div className="movie-info">
                  <span>{movie.Title}</span>
                  <button onClick={() => this.handleAddMovies(movie)}>
                    Add to Movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

//callback fxn tells waht dat we want to be passed to the component from store
function mapStateToProps(state) {
  return {
    search: state.search,
  };
}
// assuming that the connect fxn will call the callback with the redux state
const connectedAppComponent = connect(mapStateToProps)(Navbar); // connect fxn will return another fxn we will pass the componenet in which we want the argumnets
export default connectedAppComponent;
