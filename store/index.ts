import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slice/authSlice";
// import cartReducer from './slices/cartSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      authReducer: authReducer,
      // cart: cartReducer
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
