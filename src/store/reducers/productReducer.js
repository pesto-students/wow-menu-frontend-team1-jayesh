import axios from "axios";
import camelize from "camelize";

const PRODUCTS_REQUESTED = "PRODUCTS_REQUESTED";
const PRODUCTS_REQUEST_SUCCESS = "PRODUCTS_REQUEST_SUCCESS";
const PRODUCTS_REQUEST_FAILURE = "PRODUCTS_REQUEST_FAILURE";
const SET_CATEGORY = "SET_CATEGORY";
const SET_ITEM = "SET_ITEM";

const fetchproductsRequest = () => ({
  type: "PRODUCTS_REQUESTED",
});
const fetchproductsSuccess = (payload) => ({
  type: "PRODUCTS_REQUEST_SUCCESS",
  payload, // item data
});
const fetchproductsFailure = (payload) => ({
  type: "PRODUCTS_REQUEST_FAILURE",
  payload, // error message
});

export const getProducts = () => {
  return function (dispatch) {
    dispatch(fetchproductsRequest());
    axios
      .get(
        "https://api.json-generator.com/templates/7fslmyyQ52AR/data?access_token=sr5evx3wg5ok41tjpvfyqb0d9aesmtr1usqiix4z",
      )
      .then((res) => {
        dispatch(fetchproductsSuccess(camelize(res.data)));
      })
      .catch((error) => {
        dispatch(fetchproductsFailure(error.message));
      });
  };
};
export const setCategory = (payload) => ({
  type: "SET_CATEGORY", // category
  payload,
});
export const setItem = (payload) => ({
  type: "SET_ITEM", // {product}
  payload,
});

const initialState = {
  items: [],
  loading: null,
  error: "",
  selectedItem: "",
  selectedCategory: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_REQUESTED: {
      return { ...state, loading: true };
    }
    case PRODUCTS_REQUEST_SUCCESS: {
      return { ...state, loading: false, items: action.payload };
    }
    case PRODUCTS_REQUEST_FAILURE: {
      return { ...state, loading: false, items: [], error: action.payload };
    }
    case SET_CATEGORY: {
      return { ...state, selectedCategory: action.payload };
    }
    case SET_ITEM: {
      return { ...state, selectedItem: action.payload };
    }
    default:
      return state;
  }
};
