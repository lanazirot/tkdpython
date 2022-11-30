import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false
};

const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return { loading: action.payload };
    },
  },
});

const { reducer, actions } = loadingSlice;

export const { setLoading } = actions
export default reducer;