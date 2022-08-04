const PLACE_ORDER = "PLACE_ORDER";

export const placeOrder = (payload) => ({
  type: "PLACE_ORDER",
  payload,
});

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER:
      return {
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
