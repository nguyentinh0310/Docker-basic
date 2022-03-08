import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "types";

export interface NotificationPayLoad {
  id: string;
  message: string;
}

export interface MarkAsReadPayLoad {
  id: string;
}

export interface NotificationState {
  items: INotification[];
}

const initialState: NotificationState = {
  items: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<NotificationPayLoad>) {
      console.log(action.payload);
      state.items.push({
        _id: action.payload.id,
        message: action.payload.message,
        date: Date.now(),
        read: false,
      });
    },
    markAsRead(state, action: PayloadAction<MarkAsReadPayLoad>) {
      state.items = state.items.map((notification, i) =>
        notification._id === action.payload.id
          ? { ...notification, read: true }
          : notification
      );
    },
    markAsAllRead(state) {
      state.items = state.items.map((notification) => ({
        ...notification,
        read: true,
      }));
    },
    clearNofication(state) {
      state.items = [];
    },
  },
});
export const { addNotification, clearNofication, markAsAllRead, markAsRead } =
  notificationSlice.actions;
const notificationReducer = notificationSlice.reducer;
export default notificationReducer;
