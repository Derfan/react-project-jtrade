import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./styles.css";
import AppRouter from "../AppRouter";
import createStore from "../../store";

const store = createStore();

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="app">
            <AppRouter />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
