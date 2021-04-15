import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import "./index.css";
import App from "./components/App";
import movies from "./reducers/index";

const store = createStore(movies); //creating store will pass reducer as argument
console.log("store", store); //object with some properties
console.log("before state", store.getState()); // getting default state from reducer

// store.dispatch({
//   // takes argument as action object
//   //action will be pashed to movies reducers
//   type: "ADD_MOVIES",
//   movies: [{ name: "superman" }],
// });

console.log("after state", store.getState());
// passing store as a prop to app
ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);
