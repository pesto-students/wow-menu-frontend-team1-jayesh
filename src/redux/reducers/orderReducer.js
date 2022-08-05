const PLACE_ORDER = "PLACE_ORDER";

export const placeOrder = (payload) => ({
  type: "PLACE_ORDER",
  payload, // {cart Items}
});

const initialState = {
  list: [],
  manager: { name: "John Doe", id: "12345" },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER:
      return {
        ...state,
        list: [
          ...state.list,
          {
            items: action.payload,
            status: "Pending",
            id: state.list.length + 1,
          },
        ],
      };
    default:
      return state;
  }
};
