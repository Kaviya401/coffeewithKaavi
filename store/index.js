import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import customerReducer from "./customerSlice";
import ordersReducer from "./ordersSlice";
import productsReducer from "./productsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  customer: customerReducer,
  orders: ordersReducer,
  products: productsReducer,
});

const persistedReducer = persistReducer(
  { key: "brew-and-bean", storage },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
