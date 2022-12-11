import { createSlice } from "@reduxjs/toolkit";

const followSlice = createSlice({
  name: "follow",
  initialState: [],
  reducers: {
    call_follows(state, action) {
      return action.payload;
    },
    unfollow(state, action) {
      return state.filter((follow) => {
        return follow._id !== action.payload;
      });
    },
    empty_follows(state, action) {
      return [];
    },
  },
});

export const { call_follows, empty_follows, unfollow } = followSlice.actions;
export default followSlice.reducer;
