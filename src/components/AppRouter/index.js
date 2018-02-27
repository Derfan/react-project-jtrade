import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";
import MainPage from "../MainPage";
import AuthPage from "../AuthPage";

export default class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute path="/main" component={MainPage} />
        <Route path="/login" component={AuthPage} />
        <Redirect to="/main" />
      </Switch>
    );
  }
}
