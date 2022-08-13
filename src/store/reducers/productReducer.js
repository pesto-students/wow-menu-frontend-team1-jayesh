const SET_PRODUCTS = "SET_PRODUCTS";
const ADD_PRODUCTS = "ADD_PRODUCTS";
const SET_CATEGORY = "SET_CATEGORY";
const SELECT_CATEGORY = "SELECT_CATEGORY";
const SET_PAGE = "SET_PAGE";
const SET_ITEM = "SET_ITEM";

export const setProducts = (payload) => ({
  type: "SET_PRODUCTS",
  payload, // init items
});
export const addProducts = (payload) => ({
  type: "ADD_PRODUCTS",
  payload, // item of a particular category
});
export const setCategory = (payload) => ({
  type: "SET_CATEGORY", // init categories
  payload,
});
export const selectCategory = (payload) => ({
  type: "SELECT_CATEGORY", // categoryId
  payload,
});
export const setCategoryPage = (payload) => ({
  type: "SET_PAGE", // {category ,page}
  payload,
});
export const setItem = (payload) => ({
  type: "SET_ITEM", // productId
  payload,
});

const initialState = {
  items: [],
  categories: [],
  selectedItem: "",
  selectedCategory: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return { ...state, items: action.payload };
    }
    case SET_CATEGORY: {
      return {
        ...state,
        categories: action.payload,
        selectedCategory: action.payload[0],
      };
    }
    case ADD_PRODUCTS: {
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.category]: action.payload.products,
        },
      };
    }
    case SELECT_CATEGORY: {
      return { ...state, selectedCategory: action.payload };
    }
    case SET_PAGE: {
      const updatedCategory = state.categories;
      const idx = updatedCategory.indexOf(action.payload.category);
      updatedCategory[idx].page = action.payload.page;
      return { ...state, selectedCategory: updatedCategory };
    }
    case SET_ITEM: {
      return { ...state, selectedItem: action.payload };
    }
    default:
      return state;
  }
};
