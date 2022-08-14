import axios from "axios";
import camelize from "camelize";
import snakeize from "snakeize";

const BILL_REQUESTED = "BILL_REQUESTED";
const BILL_REQUEST_SUCCESS = "BILL_REQUEST_SUCCESS";
const BILL_REQUEST_FAILURE = "BILL_REQUEST_FAILURE";

const billRequest = () => ({
  type: "BILL_REQUESTED",
});
const billSuccess = (payload) => ({
  type: "BILL_REQUEST_SUCCESS",
  payload, // bill data
});
const billFailure = (payload) => ({
  type: "BILL_REQUEST_FAILURE",
  payload, // error message
});

export const getBill = () => {
  return function (dispatch, getState) {
    const payload = { orderId: getState().order.id };
    dispatch(billRequest());
    axios
      .post("/api/bills", snakeize(payload))
      .then((res) => {
        dispatch(billSuccess(camelize(res.data.data)));
      })
      .catch((error) => {
        dispatch(billFailure(error.message));
      });
  };
};

const initialState = {
  details: "",
  loading: null,
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BILL_REQUESTED: {
      return { ...state, loading: true };
    }
    case BILL_REQUEST_SUCCESS: {
      return { ...state, loading: false, details: action.payload };
    }
    case BILL_REQUEST_FAILURE: {
      return { ...state, loading: false, details: null, error: action.payload };
    }
    default:
      return state;
  }
};