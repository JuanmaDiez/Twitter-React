import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    login(state, action) {
      return { ...action.payload };
    },
    follow(state, action) {
      if (
        state.following.find((follow) => {
          return follow === action.payload;
        })
      ) {
        return {
          ...state,

          following: state.following.filter((follow) => {
            return follow !== action.payload;
          }),
        };
      } else {
        return {
          ...state,
          following: [...state.following, action.payload],
        };
      }
    },
    logout(state, action) {
      return {};
    },
  },
});

export const { login, follow, logout } = userSlice.actions;
export default userSlice.reducer;
