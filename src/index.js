import React, { createContext } from "react";
import thunk from "redux-thunk";
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
  if (typeof action !== "function") {
    console.log("action type", action.type);
  }

  next(action); //need to call next else app will be stuck calling next middleware or dispatch
};

//redux thunk will do the same thing
// to call fxn if action is fxn else call next
// will also fix async type of actioncreator due to api call
// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//   if (typeof action === "function") {
//     action(dispatch);
//     return;
//   }
//   next(action); //need to call next else app will be stuck calling next middleware or dispatch
// };

export const storeContext = createContext(); //create a context as we are passing store so storecontect
console.log("contect", storeContext); // have subscriber and provider properties

class Provider extends React.Component {
  render() {
    const { store } = this.props;
    // if store passed to the provider is cahnged all the child and there decendent who are using store will be rerendered
    return (
      <storeContext.Provider value={store}>
        {/* // {store is available to all the child and decendant of child} */}
        {this.props.children}
      </storeContext.Provider>
    );
  }
}
const store = createStore(rootReducer, applyMiddleware(logger, thunk)); //creating store will pass reducer as argument

// calling connect will take callback and componet will add all callback pro and dispatch to the comp and subscribe the comp to the store cahnges and call the comp
// on unmount unsubscribe the changes
// const connectedAppComponent = connect(callback)(App); calling connect return new comp
export function connect(callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        // subscribe  will return another fxn to unsubscribe
        this.unsubscribe = this.props.store.subscribe(
          () =>
            // only those comp will be rerendered in which  props passed are changed like movie
            this.forceUpdate() // forcefully update the comp as after state change no rerener so no chnages showing on the UI
        );
      }
      componentWillUnmount() {
        // will unsubscribe when component will unmount
        this.unsubscribe();
      }
      render() {
        const { store } = this.props;
        const state = store.getState();
        const dataToBePassedAsProps = callback(state);
        return (
          //passing props from call back and dispatch to the component
          <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />
        );
      }
    }
    // need state in constructor so call wrapper
    class ConnectedComponentWrapper extends React.Component {
      render() {
        return (
          <storeContext.Consumer>
            {(store) => <ConnectedComponent store={store} />}
          </storeContext.Consumer>
        );
      }
    }
    return ConnectedComponentWrapper;
  };
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
