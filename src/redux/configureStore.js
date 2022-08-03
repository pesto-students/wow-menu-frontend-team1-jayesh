import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./reducers/menuReducer";
import ordersReducer from "./reducers/ordersReducer";

const store = configureStore({
  reducer: {
    orderCart: ordersReducer,
    menu: menuReducer,
  },
});

export default store;
