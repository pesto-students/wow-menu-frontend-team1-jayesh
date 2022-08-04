import mockData from "../../assets/js/mock_data.json";

const SET_CATEGORY = "SET_CATEGORY";
const SET_ITEM = "SET_ITEM";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const RESET_MENU = "RESET_MENU";

const menu = mockData.map((item) => {
  return { ...item, qty: 0 };
});
const allCategories = [...new Set(menu.map((item) => item.category))];

export const resetMenu = () => ({
  type: "RESET_MENU",
});
export const setCategory = (payload) => ({
  type: "SET_CATEGORY",
  payload,
});
export const setItem = (payload) => ({
  type: "SET_ITEM",
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
export const updateQuantity = (payload) => ({
  type: "UPDATE_QUANTITY",
  payload,
});

const initialState = {
  dishes: menu,
  dishesByCategory: menu.filter((dish) => dish.category === allCategories[0]),
  categories: allCategories,
  selectedCategory: allCategories[0],
  selectedItem: "",
  itemsInCart: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY: {
      return {
        ...state,
        selectedCategory: action.payload,
        dishesByCategory: state.dishes.filter(
          (dish) => dish.category === action.payload,
        ),
      };
    }
    case SET_ITEM: {
      return {
        ...state,
        selectedItem: state.dishes.find((dish) => dish.id === action.payload),
      };
    }
    case INCREASE_QUANTITY: {
      const newDishState = state.dishes.map((dish) => {
        if (dish.id === action.payload) {
          return { ...dish, qty: dish.qty + 1 };
        }
        return dish;
      });
      return {
        ...state,
        dishes: newDishState,
        itemsInCart: state.itemsInCart + 1,
        selectedItem: {
          ...state.selectedItem,
          qty: state.selectedItem.qty + 1,
        },
        dishesByCategory: newDishState.filter(
          (dish) => dish.category === state.selectedCategory,
        ),
      };
    }
    case DECREASE_QUANTITY: {
      const newDishState = state.dishes.map((dish) => {
        if (dish.id === action.payload) {
          return { ...dish, qty: dish.qty - 1 };
        }
        return dish;
      });
      return {
        ...state,
        dishes: newDishState,
        itemsInCart: state.itemsInCart - 1,
        selectedItem: {
          ...state.selectedItem,
          qty: state.selectedItem.qty - 1,
        },
        dishesByCategory: newDishState.filter(
          (dish) => dish.category === state.selectedCategory,
        ),
      };
    }
    case UPDATE_QUANTITY: {
      const newDishState = state.dishes.map((dish) => {
        if (dish.id === action.payload.id) {
          return { ...dish, qty: action.payload.qty };
        }
        return dish;
      });
      return {
        ...state,
        dishes: newDishState,
        itemsInCart: newDishState
          .filter((item) => item.qty > 0)
          .reduce((sum, current) => sum + current.qty, 0),
        selectedItem: {
          ...state.selectedItem,
          qty: action.payload.qty,
        },
        dishesByCategory: newDishState.filter(
          (dish) => dish.category === state.selectedCategory,
        ),
      };
    }
    case RESET_MENU: {
      return initialState;
    }
    default:
      return state;
  }
};
