import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "api/userApi";
import { IUser } from "types";

export const fetchListUser: any = createAsyncThunk(
  "user/fetch",
  async (currentPage: number) => {
    const data = await userApi.getUserPaging(currentPage);
    return data;
  }
);

export interface UsersState {
  items: IUser[];
  page: number;
  total: number;
  pageSize: number;
  loading: boolean;
}

const initialState: UsersState = {
  items: [],
  page: 1,
  total: 0,
  pageSize: 0,
  loading: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchListUser.pending]: (state) => {
      state.loading = true;
    },
    [fetchListUser.fulfilled]: (state, action: PayloadAction<any>) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.loading = false;
    },
    [fetchListUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const {} = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
