const SET_DETAILS = "SET_DETAILS";
const SET_ID = "SET_ID";
const SET_TABLE = "RESET_TABLE";

export const setRestaurant = (payload) => ({
  type: "SET_DETAILS",
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
    case SET_DETAILS: {
      return { ...state, details: action.payload };
    }
    case SET_ID: {
      return { ...state, id: action.payload };
    }
    case SET_TABLE: {
      return { ...state, tableNo: action.payload };
    }
    default:
      return state;
  }
};
