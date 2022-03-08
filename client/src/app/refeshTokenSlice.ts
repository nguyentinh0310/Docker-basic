import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "api/authApi";
import { IToken } from "types";

export const refreshTokenAuth: any = createAsyncThunk(
  "auth/refresh-token",
  async (payload: IToken) => {
    const data = await authApi.refreshToken(payload);
    return data;
  }
);
export interface AuthState {
  token: string;
  refreshToken: string;
  loading: boolean;
}

const initialState: AuthState = {
  token: "",
  refreshToken: "",
  loading: false,
};

const refreshTokenSlice = createSlice({
  name: "refreshToken",
  initialState,
  reducers: {},
  extraReducers: {
    [refreshTokenAuth.pending]: (state) => {
      state.loading = true;
    },
    [refreshTokenAuth.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.loading = false;
    },
    [refreshTokenAuth.rejected]: (state) => {
      state.loading = false;
    },
  },
});

const refreshTokenReducer = refreshTokenSlice.reducer;
export default refreshTokenReducer;
