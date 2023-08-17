import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: (() => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) || null;
      console.log("User from local storage:", user);
      return user;
    } catch (error) {
      console.error("Error parsing user:", error);
      return null;
    }
  })(),
  baseCurrency: localStorage.getItem("baseCurrency"),
};

const userSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
});

export const { setUser, setBaseCurrency } = userSlice.actions;

export default userSlice.reducer;
