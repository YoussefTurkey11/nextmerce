"use client";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        <Toaster position="top-right" />
      </PersistGate>
    </Provider>
  );
}
