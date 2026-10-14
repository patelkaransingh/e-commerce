import { Tuser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggingIn: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Tuser | any>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoggingIn = false;
    },

    clearUser: (state) => {
      state = initialState;
    },

    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoggingIn = action.payload;
    },
  },
});

export const { setUser, clearUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
