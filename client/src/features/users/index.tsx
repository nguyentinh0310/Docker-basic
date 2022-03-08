import { useAppDispatch, useAppSelector } from "app/hooks";
import { getCurrentLogginUser } from "features/auth/authSlice";
import { addNotification } from "features/notification/notificationSlice";
import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import socketIoClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import AddEditPage from "./pages/AddEditPage";
import ListPage from "./pages/ListPage";

export default function UserFeature() {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?._id);

  // useEffect(() => {
  //   dispatch(getCurrentLogginUser());
  // }, [dispatch]);

  useEffect(() => {
    const socket = socketIoClient.io("http://localhost:5000");
    socket.on("connect", function (data: any) {
      socket.emit("login", { userId: userId });
      // <-- this works
      socket.on("message", function (message: any) {
        console.log(message);
      });

      socket.on("user_created", function (message: any) {
        console.log("user_created");
        const id = uuidv4();
        dispatch(addNotification({ id, message }));
      });
      socket.on("user_updated", function (message: any) {
        console.log("user_updated");
        const id = uuidv4();
        // console.log({ id, message });
        dispatch(addNotification({ id, message }));
      });
      socket.on("user_deleted", function (message: any) {
        console.log("user_deleted");
        const id = uuidv4();
        dispatch(addNotification({ id: id, message }));
      });
    });
  }, []);

  return (
    <Switch>
      <Route path={match.path} component={ListPage} exact />

      <Route path={`${match.path}/add`}>
        <AddEditPage />
      </Route>

      <Route path={`${match.path}/:userId`}>
        <AddEditPage />
      </Route>
    </Switch>
  );
}
