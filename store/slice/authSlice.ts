import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Tuser } from "@/types";

type AuthState = {
  user: Tuser | null;
  isLoggingIn: boolean;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoggingIn: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Tuser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoggingIn = false;
    },

    clearUser: () => {
      return initialState;
    },

    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoggingIn = action.payload;
    },
  },
});

export const { setUser, clearUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
