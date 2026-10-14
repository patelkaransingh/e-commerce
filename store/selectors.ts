import { RootState } from "./index";

export const selectUser = (state: RootState) => state.authReducer.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.authReducer.isAuthenticated;
export const selectAuthLoading = (state: RootState) =>
  state.authReducer.isLoggingIn;
export const selectUserRole = (state: RootState) =>
  state.authReducer.user?.role;
