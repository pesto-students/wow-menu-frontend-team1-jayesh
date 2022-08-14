import axios from "axios";
import camelize from "camelize";
import snakeize from "snakeize";

const ORDER_PLACED_REQUEST = "PLACE_ORDER_REQUEST";
const ORDER_PLACED_SUCCESS = "ORDER_PLACED_SUCCESS";
const ORDER_PLACED_FAILURE = "ORDER_PLACED_FAILURE";

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

export const placeNewOrder = (payload) => {
  return function (dispatch, getState) {
    const orderDetail = {
      ...payload,
      restaurantId: getState().restaurant.details.id,
      tableNo: getState().restaurant.details.tableNo,
    };
    dispatch(postOrderRequest());
    axios
      .post(
        "https://wow-menu-staging.herokuapp.com/api/orders",
        snakeize(orderDetail),
      )
      .then((res) => {
        dispatch(postOrderSuccess(camelize(res.data.data)));
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
      .patch(url, snakeize(payload))
      .then((res) => {
        dispatch(postOrderSuccess(camelize(res.data.data)));
      })
      .catch((error) => {
        dispatch(postOrderFailure(error.message));
      });
  };
};

const initialState = {
  id: null,
  list: [],
  loading: null,
  error: "",
  manager: { name: "John Doe", id: "12345" },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_PLACED_REQUEST: {
      return { ...state, loading: true };
    }
    case ORDER_PLACED_SUCCESS: {
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
    default:
      return state;
  }
};
