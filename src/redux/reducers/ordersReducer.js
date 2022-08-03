// const GET_ALL_PRODUCT = "GET_ALL_PRODUCT";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";

export const addToCart = (payload) => ({
  type: "ADD_TO_CART",
  payload,
});

export const removeFromCart = (payload) => ({
  type: "REMOVE_FROM_CART",
  payload,
});

export const increaseQuantity = (payload) => ({
  type: "INCREASE_QUANTITY",
  payload,
});

export const decreaseQuantity = (payload) => ({
  type: "DECREASE_QUANTITY",
  payload,
});

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state.orders, { ...action.payload, quantity: 1 }];
    case REMOVE_FROM_CART:
      return state.orders.filter((item) => item.id !== action.payload.id);
    case INCREASE_QUANTITY:
      return state.orders.map((_item) => {
        const item = { ..._item };
        if (item.id === action.payload.id) item.quantity += 1;
        return item;
      });
    case DECREASE_QUANTITY:
      return state.orders.map((_item) => {
        const item = { ..._item };
        if (item.id === action.payload.id) item.quantity -= 1;
        return item;
      });
    default:
      return state;
  }
};
