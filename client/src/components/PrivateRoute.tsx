import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export function PrivateRoute(props: RouteProps) {
  // check if user is logged in
  // if yes, show route, otherwise redirect to login
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  if (!isLoggedIn) return <Redirect to="/login" />;
  return <Route {...props} />;
}
