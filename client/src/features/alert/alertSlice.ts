import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertPayload {
  message: string;
}

export interface AlertState {
  type: string | null;
  message: string | null;
}

const initialState: AlertState = {
  type: null,
  message: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    alertSuccess(state, action: PayloadAction<AlertPayload>) {
      state.type = "alert-success";
      state.message = action.payload.message;
    },
    alertError(state, action: PayloadAction<AlertPayload>) {
      state.type = "alert-danger";
      state.message = action.payload.message;
    },
    clearAlert(state) {
      state.type = null;
      state.message = null;
    },
  },
});
export const { alertSuccess, alertError, clearAlert } = alertSlice.actions;
const alertReducer = alertSlice.reducer;
export default alertReducer;
