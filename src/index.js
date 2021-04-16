import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers/index";

const store = createStore(rootReducer); //creating store will pass reducer as argument

// passing store as a prop to app
ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);
