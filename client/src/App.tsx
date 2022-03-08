import { PrivateRoute } from "components/PrivateRoute";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LoginPage from "./features/auth/LoginPage";
import UserFeature from "./features/users";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect from="/" to="/user" exact />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/user" component={UserFeature} />
      </Switch>
    </div>
  );
}

export default App;
