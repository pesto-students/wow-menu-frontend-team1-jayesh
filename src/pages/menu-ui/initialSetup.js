import { useEffect } from "react";
import { useDispatch } from "react-redux";
import GetRestaurant from "../../services/restaurant";
import GetCategories from "../../services/categories";
import { setCategory } from "../../store/reducers/productReducer";
import {
  setRestaurant,
  setRestaurantId,
  setTable,
} from "../../store/reducers/restaurantReducer";

export default function InitialSetup() {
  const dispatch = useDispatch();
  // // TODO: pick up restaurant Id and table table from URL and GET restaurant details
  const restaurantId = "63077d6ac31f771aaca9c858";
  const table = 7;
  dispatch(setRestaurantId(restaurantId));
  dispatch(setTable(table));

  const { response: categories } = GetCategories(restaurantId);
  const { response: restaurant } = GetRestaurant(restaurantId);

  useEffect(() => {
    if (categories) {
      dispatch(
        setCategory(categories.data.map(({ name, id }) => ({ name, id }))),
      );
    }
  }, [categories]);

  useEffect(() => {
    if (restaurant) {
      dispatch(setRestaurant(restaurant.data));
    }
  }, [restaurant]);
}
