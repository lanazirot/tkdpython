import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messages";
import { setLoading } from "./loading";


import authService from "../services/login.service";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login(email, password);
      return { user: data };
    } catch (error) {
      const message = error.response.data || "Unknown error";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, img_url }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await authService.register(name, email, password, img_url);
      console.log(data);
      thunkAPI.dispatch(setLoading(false));
      return {user: data};
    } catch (error) {
      thunkAPI.dispatch(setLoading(false));
      const message = error.response.data || "Unknown error";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);



export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    }
  },
});

const { reducer } = authSlice;
export default reducer;
