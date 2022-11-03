import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    login(state, action) {
      console.log(action.payload);
      return { ...action.payload };
    },
    logout(state, action) {
      state = {};
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
