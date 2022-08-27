const SET_BILL = "SET_BILL";
const RESET_BILL = "RESET_BILL";

export const setBill = (payload) => ({
  type: "SET_BILL",
  payload, // bill data
});
export const resetBill = () => ({
  type: "RESET_BILL",
});

const initialState = {
  details: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BILL: {
      return { ...state, details: action.payload };
    }
    case RESET_BILL: {
      return initialState;
    }
    default:
      return state;
  }
};
