import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import authReducer from "features/auth/authSlice";
import userReducer from "features/users/userSlice";
import { history } from "./history";
import refreshTokenReducer from "./refeshTokenSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import notificationReducer from "../features/notification/notificationSlice";
import alertReducer from "features/alert/alertSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  user: userReducer,
  refreshToken: refreshTokenReducer,
  notification: notificationReducer,
  alert: alertReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)),
});

export const persistor = persistStore(store);

export default store;

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
