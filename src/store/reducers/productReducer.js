const SET_CATEGORY = "SET_CATEGORY";
const SELECT_CATEGORY = "SELECT_CATEGORY";
const SET_PAGE = "SET_PAGE";
const SET_ITEM = "SET_ITEM";

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
  categories: [],
  selectedItem: "",
  selectedCategory: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY: {
      return {
        ...state,
        categories: action.payload,
        selectedCategory: action.payload[0],
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
