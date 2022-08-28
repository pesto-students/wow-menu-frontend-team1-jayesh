const SET_RESTAURANT = "SET_RESTAURANT";
const RESET_RESTAURANT = "RESET_RESTAURANT";
const SET_ID = "SET_ID";
const SET_TABLE = "SET_TABLE";

export const setRestaurant = (payload) => ({
  type: "SET_RESTAURANT",
  payload, // restaurant details
});
export const resetRestaurant = (payload) => ({
  type: "RESET_RESTAURANT",
  payload, // restaurant details
});
export const setRestaurantId = (payload) => ({
  type: "SET_ID",
  payload, // restaurant id
});
export const setTable = (payload) => ({
  type: "SET_TABLE",
  payload, // table no
});

const initialState = {
  details: {},
  id: "",
  tableNo: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RESTAURANT: {
      return { ...state, details: action.payload, id: action.payload.id };
    }
    case SET_ID: {
      return { ...state, id: action.payload };
    }
    case SET_TABLE: {
      return { ...state, tableNo: action.payload };
    }
    case RESET_RESTAURANT: {
      return initialState;
    }
    default:
      return state;
  }
};
