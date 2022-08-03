import { groupBy } from "lodash";
import mockData from "../../assets/js/mock_data.json";

const GET_PRODUCT_BY_CATEGORY = "GET_PRODUCT_BY_CATEGORY";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";

const menu = mockData.map((item) => {
  return { ...item, quantity: 0 };
});
const groupByCategory = () => groupBy(menu, "category");
const allCategories = Object.keys(groupByCategory());

export const getProductByCategory = (payload) => ({
  type: "GET_PRODUCT_BY_CATEGORY",
  payload,
});

export const increaseQuantity = (payload) => ({
  type: "INCREASE_QUANTITY",
  payload,
});

export const decreaseQuantity = (payload) => ({
  type: "DECREASE_QUANTITY",
  payload,
});

const initialState = {
  dishes: menu,
  dishesByCategory: [],
  categories: allCategories,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_CATEGORY:
      return { ...state, dishesByCategory: groupByCategory()[action.payload] };
    case INCREASE_QUANTITY:
      return {
        ...state,
        dishes: state.dishes.map((_item) => {
          const item = { ..._item };
          if (item.id === action.payload) item.quantity += 1;
          return item;
        }),
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        dishes: state.dishes.map((_item) => {
          const item = { ..._item };
          if (item.id === action.payload) item.quantity -= 1;
          return item;
        }),
      };
    default:
      return state;
  }
};
