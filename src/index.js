import "./index.scss";
import "semantic-ui-css/semantic.min.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancer(applyMiddleware(thunk)); // , loggerMiddleware

const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
