import axios from "axios";

const RESTAURANT_REQUESTED = "RESTAURANT_REQUESTED";
const RESTAURANT_REQUEST_SUCCESS = "RESTAURANT_REQUEST_SUCCESS";
const RESTAURANT_REQUEST_FAILURE = "RESTAURANT_REQUEST_FAILURE";

const fetchRestaurantDetailRequest = () => ({
  type: "RESTAURANT_REQUESTED",
});
const fetchRestaurantDetailSuccess = (payload) => ({
  type: "RESTAURANT_REQUEST_SUCCESS",
  payload, // item data
});
const fetchRestaurantDetailFailure = (payload) => ({
  type: "RESTAURANT_REQUEST_FAILURE",
  payload, // error message
});

export const getRestaurantDetails = () => {
  return function (dispatch) {
    dispatch(fetchRestaurantDetailRequest());
    axios
      .get(
        "https://api.json-generator.com/templates/qQNrYP3Qftv6/data?access_token=sr5evx3wg5ok41tjpvfyqb0d9aesmtr1usqiix4z",
      )
      .then((res) => {
        dispatch(fetchRestaurantDetailSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchRestaurantDetailFailure(error.message));
      });
  };
};

const initialState = {
  details: {},
  loading: null,
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESTAURANT_REQUESTED: {
      return { ...state, loading: true };
    }
    case RESTAURANT_REQUEST_SUCCESS: {
      return { loading: false, details: action.payload };
    }
    case RESTAURANT_REQUEST_FAILURE: {
      return { ...state, loading: false, details: [], error: action.payload };
    }
    default:
      return state;
  }
};
