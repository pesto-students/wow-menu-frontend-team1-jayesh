import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import productReducer from "./reducers/productReducer";
import restaurantReducer from "./reducers/restaurantReducer";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    restaurant: restaurantReducer,
  },
});

export default store;
