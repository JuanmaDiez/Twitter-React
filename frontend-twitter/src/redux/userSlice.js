import { bindActionCreators, createSlice } from "@reduxjs/toolkit";

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
    register(state, action) {
      return { ...action.payload };
    },
  },
});

export const { login, logout, register } = userSlice.actions;
export default userSlice.reducer;
