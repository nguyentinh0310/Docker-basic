import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authApi from "api/authApi";
import { ILogin, IUser } from "types";

export const login: any = createAsyncThunk(
  "auth/login",
  async (payload: ILogin) => {
    const data = await authApi.logIn(payload);
    return data;
  }
);

export const getCurrentLogginUser: any = createAsyncThunk(
  "auth/getCurrentLogginUser",
  async () => {
    const data = await authApi.getCurrentLogginUser();
    return data;
  }
);

export const logout: any = createAsyncThunk("auth/logout", async () => {
  const data = await authApi.logout();
  return data;
});

export interface AuthState {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.loading = false;
    },
    [login.rejected]: (state) => {
      state.loading = false;
      state.token = null;
      state.refreshToken = null;
    },
    [getCurrentLogginUser.pending]: (state) => {
      state.loading = true;
    },
    [getCurrentLogginUser.fulfilled]: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.loading = false;
    },
    [getCurrentLogginUser.rejected]: (state) => {
      state.user = null;
      state.loading = false;
    },
    [logout.fulfilled]: (state) => {
      state.loading = false;
      state.token = null;
      state.refreshToken = null;
    },
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
