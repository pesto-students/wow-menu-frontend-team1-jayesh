const PLACE_ORDER = "PLACE_ORDER";

export const placeOrder = (payload) => ({
  type: "PLACE_ORDER",
  payload,
});

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER:
      return [...state.orders, { ...action.payload, status: "Pending" }];
    default:
      return state;
  }
};
