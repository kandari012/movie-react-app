import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <div className="search-container">
          <input type="text" />
          <button id="search-btn">Search</button>
        </div>
      </div>
    );
  }
}

export default Navbar;
