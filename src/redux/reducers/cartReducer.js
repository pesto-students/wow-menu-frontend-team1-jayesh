const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const RESET_CART = "RESET_CART";

export const addToCart = (payload) => ({
  type: "ADD_TO_CART",
  payload, // {id,price,qty}
});
export const removeFromCart = (payload) => ({
  type: "REMOVE_FROM_CART",
  payload, // id
});
export const increaseQuantity = (payload) => ({
  type: "INCREASE_QUANTITY",
  payload, // id
});
export const decreaseQuantity = (payload) => ({
  type: "DECREASE_QUANTITY", // id
  payload,
});
export const updateQuantity = (payload) => ({
  type: "UPDATE_QUANTITY", // {id,price,qty}
  payload,
});
export const resetCart = () => ({
  type: "RESET_CART",
});

const initialState = {
  items: [],
  // totalItem: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        items: [...state.items, action.payload],
        // totalItem: state.totalItem + action.payload.qty,
      };
    }
    case REMOVE_FROM_CART: {
      return {
        items: state.items.filter((item) => item.id !== action.payload),
        // totalItem: state.totalItem - 1,
      };
    }
    case INCREASE_QUANTITY: {
      const newitemState = state.items.map((item) =>
        item.id === action.payload ? { ...item, qty: item.qty + 1 } : item,
      );
      return {
        items: newitemState,
        // totalItem: state.totalItem + 1,
      };
    }
    case DECREASE_QUANTITY: {
      const newitemState = state.items.map((item) =>
        item.id === action.payload ? { ...item, qty: item.qty - 1 } : item,
      );
      return {
        items: newitemState,
        // totalItem: state.totalItem - 1,
      };
    }
    case UPDATE_QUANTITY: {
      const newitemState = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: action.payload.qty - 1 }
          : item,
      );
      return {
        items: newitemState,
        // totalItem: newitemState.reduce((sum, current) => sum + current.qty, 0),
      };
    }
    case RESET_CART: {
      return initialState;
    }
    default:
      return state;
  }
};
