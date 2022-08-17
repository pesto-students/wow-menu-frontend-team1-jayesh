import axios from "axios";

const SET_ORDER = "SET_ORDER";
const ORDER_PLACED_REQUEST = "PLACE_ORDER_REQUEST";
const ORDER_PLACED_SUCCESS = "ORDER_PLACED_SUCCESS";
const ORDER_PLACED_FAILURE = "ORDER_PLACED_FAILURE";
const RESET_ORDER = "RESET_ORDER";

const postOrderRequest = () => ({
  type: "PLACE_ORDER_REQUEST",
});
const postOrderSuccess = (payload) => ({
  type: "ORDER_PLACED_SUCCESS",
  payload, // item data
});
const postOrderFailure = (payload) => ({
  type: "ORDER_PLACED_FAILURE",
  payload, // error message
});

export const setOrder = (payload) => ({
  type: "SET_ORDER",
  payload,
});

export const resetOrder = () => ({
  type: "RESET_ORDER",
});

export const getOrderById = (payload) => {
  return function (dispatch) {
    dispatch(postOrderRequest());
    axios
      .get(`https://wow-menu-staging.herokuapp.com/api/orders/${payload}`)
      .then((res) => {
        dispatch(postOrderSuccess(res.data.data));
      })
      .catch((error) => {
        dispatch(postOrderFailure(error.message));
      });
  };
};

export const placeNewOrder = (payload) => {
  return function (dispatch, getState) {
    const orderDetail = {
      ...payload,
      restaurantId: getState().restaurant.details.id,
      tableNo: getState().restaurant.details.tableNo,
    };
    dispatch(postOrderRequest());
    axios
      .post("https://wow-menu-staging.herokuapp.com/api/orders", orderDetail)
      .then((res) => {
        dispatch(postOrderSuccess(res.data.data));
      })
      .catch((error) => {
        dispatch(postOrderFailure(error.message));
      });
  };
};

export const placeOrderAgain = (payload) => {
  return function (dispatch, getState) {
    dispatch(postOrderRequest());
    const url = `https://wow-menu-staging.herokuapp.com/api/orders/${
      getState().order.id
    }/add`;
    axios
      .patch(url, payload)
      .then((res) => {
        dispatch(postOrderSuccess(res.data.data));
      })
      .catch((error) => {
        dispatch(postOrderFailure(error.message));
      });
  };
};

const initialState = {
  list: [],
  loading: null,
  error: "",
  manager: { name: "John Doe", id: "12345" },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER: {
      return { ...state, list: action.payload.iterations };
    }
    case ORDER_PLACED_REQUEST: {
      return { ...state, loading: true };
    }
    case ORDER_PLACED_SUCCESS: {
      window.localStorage.setItem("orderId", action.payload.id);
      return {
        ...state,
        loading: false,
        id: action.payload.id,
        list: action.payload.iterations,
      };
    }
    case ORDER_PLACED_FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }
    case RESET_ORDER: {
      window.localStorage.setItem("orderId", "");
      return initialState;
    }
    default:
      return state;
  }
};
