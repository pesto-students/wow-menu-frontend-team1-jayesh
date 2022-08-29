const SET_ORDER = "SET_ORDER";
const RESET_ORDER = "RESET_ORDER";

export const setOrder = (payload) => ({
  type: "SET_ORDER",
  payload,
});

export const resetOrder = () => ({
  type: "RESET_ORDER",
});

const initialState = {
  list: [],
  id: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER: {
      return {
        ...state,
        list: action.payload.iterations,
        id: action.payload.id,
      };
    }
    case RESET_ORDER: {
      return initialState;
    }
    default:
      return state;
  }
};
