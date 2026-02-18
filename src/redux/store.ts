import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./baseApi";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import wishlistReducer from "./slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["wishlist"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  wishlist: wishlistReducer,
  ui: uiReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
