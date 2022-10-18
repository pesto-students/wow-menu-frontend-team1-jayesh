/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import {
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import productReducer from "./reducers/productReducer";
import restaurantReducer from "./reducers/restaurantReducer";
import billReducer from "./reducers/billReducer";
import authReducer from "./reducers/authReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = {
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
  restaurant: restaurantReducer,
  bill: billReducer,
  auth: authReducer,
};

const persistedReducer = persistCombineReducers(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
