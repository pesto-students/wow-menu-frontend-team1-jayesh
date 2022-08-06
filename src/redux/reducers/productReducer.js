import mockData from "../../assets/js/mock_data.json";

const SET_PRODUCTS = "SET_PRODUCTS";
const SET_CATEGORY = "SET_CATEGORY";
const SET_ITEM = "SET_ITEM";

export const setProducts = (payload) => ({
  type: "SET_PRODUCTS",
  payload, // [{products}]
});
export const setCategory = (payload) => ({
  type: "SET_CATEGORY", // category
  payload,
});
export const setItem = (payload) => ({
  type: "SET_ITEM", // {product}
  payload,
});

const initialState = {
  items: mockData.filter((item) => item.isActive),
  selectedItem: "",
  selectedCategory: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return { ...state, items: action.payload };
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
