import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import "./index.css";
import App from "./components/App";
import movies from "./reducers/index";

const store = createStore(movies); //creating store will pass reducer as argument
console.log("store", store); //object with some properties
console.log("state", store.getState()); // getting default state from reducer
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
