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
        state.user.following.find((follow) => {
          return follow._id === action.payload._id;
        })
      ) {
        return {
          ...state,
          user: {
            ...state.user,
            following: state.user.following.filter((follow) => {
              return follow._id !== action.payload._id;
            }),
          },
        };
      } else {
        return {
          ...state,
          user: {
            ...state.user,
            following: [...state.user.following, action.payload],
          },
        };
      }
    },
    logout(state, action) {
      state = {};
    },
  },
});

export const { login, follow, logout } = userSlice.actions;
export default userSlice.reducer;
