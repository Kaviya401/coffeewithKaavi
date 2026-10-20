"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store";
import { fetchProducts } from "../store/productsSlice";
import ToastProvider from "./ToastProvider";

function StoreBootstrap({ children }) {
  useEffect(() => {
    if (store.getState().products.status === "idle") {
      store.dispatch(fetchProducts());
    }
  }, []);

  return children;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div className="app-loading">Warming up the coffee...</div>} persistor={persistor}>
        <StoreBootstrap>
          <ToastProvider>{children}</ToastProvider>
        </StoreBootstrap>
      </PersistGate>
    </Provider>
  );
}
