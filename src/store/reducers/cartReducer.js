const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const UPDATE_INSTRUCTIONS = "UPDATE_INSTRUCTIONS";
const SET_CART = "SET_CART";
const RESET_CART = "RESET_CART";

export const addToCart = (payload) => ({
  type: "ADD_TO_CART",
  payload, // {...item,quantity}
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
  type: "UPDATE_QUANTITY", // {id,quantity}
  payload,
});
export const addInstruction = (payload) => ({
  type: "UPDATE_INSTRUCTIONS", // text
  payload,
});
export const setCart = (payload) => ({
  type: "SET_CART",
  payload,
});
export const resetCart = () => ({
  type: "RESET_CART",
});

const initialState = {
  items: [],
  instruction: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART: {
      return { ...state, items: action.payload };
    }
    case ADD_TO_CART: {
      return {
        items: [...state.items, action.payload],
      };
    }
    case REMOVE_FROM_CART: {
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    case INCREASE_QUANTITY: {
      const newitemState = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      return {
        items: newitemState,
      };
    }
    case DECREASE_QUANTITY: {
      const newitemState = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
      return {
        items: newitemState,
      };
    }
    case UPDATE_QUANTITY: {
      const newitemState = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );
      return {
        items: newitemState,
      };
    }
    case UPDATE_INSTRUCTIONS: {
      return { ...state, instruction: action.payload };
    }
    case RESET_CART: {
      return initialState;
    }
    default:
      return state;
  }
};
