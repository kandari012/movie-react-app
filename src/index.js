import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers/index";

// curried fxn logger(obj,next,action)
//redux will call as logger(obj)(next)(action)
// fxn will get a object which will have dispatch and setState as properties ,store fxns
// const logger = function ({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       //middleware code
//       console.log("action type", action.type);
//       next(action); //need to call next else app will be stuck calling next middleware or dispatch
//     };
//   };
// };

// better way of writing middleware
const logger = ({ dispatch, getState }) => (next) => (action) => {
  //middleware code
  console.log("action type", action.type);
  next(action); //need to call next else app will be stuck calling next middleware or dispatch
};

const store = createStore(rootReducer, applyMiddleware(logger)); //creating store will pass reducer as argument
// passing store as a prop to app
ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);
