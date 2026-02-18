import { configureStore } from "@reduxjs/toolkit";
import { api } from "./baseApi";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const rootReducer = {
  auth: authReducer,
  ui: uiReducer,
  [api.reducerPath]: api.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
