import React from "react";
import thunk from "redux-thunk";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";

// better way of writing middleware
const logger = ({ dispatch, getState }) => (next) => (action) => {
  //middleware code
  if (typeof action !== "function") {
    console.log("action type", action.type);
  }

  next(action); //need to call next else app will be stuck calling next middleware or dispatch
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk)); //creating store will pass reducer as argument

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
