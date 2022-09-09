import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import RestaurantService from "../../services/restaurant";
import CategoriesService from "../../services/categories";
import { setCategory } from "../../store/reducers/productReducer";
import {
  setRestaurant,
  setRestaurantId,
  setTable,
} from "../../store/reducers/restaurantReducer";

export default function InitialSetup() {
  const dispatch = useDispatch();
  const { restaurantId, table } = useParams();
  const [success, setSuccess] = useState(false);

  const {
    loading,
    response: restaurant,
    error,
    getRestaurant,
  } = RestaurantService();
  const { response: categories, getCategories } = CategoriesService();

  useEffect(() => {
    if (restaurantId) {
      dispatch(setRestaurantId(restaurantId));
      dispatch(setTable(table));
      getRestaurant(restaurantId);
    }
  }, [restaurantId]);

  useEffect(() => {
    if (categories && categories.data.length > 0) {
      dispatch(
        setCategory(categories.data.map(({ name, id }) => ({ name, id }))),
      );
    }
  }, [categories]);

  useEffect(() => {
    if (restaurant && restaurant.data) {
      dispatch(setRestaurant(restaurant.data));
      getCategories({ restaurantId });
      setSuccess(true);
    }
  }, [restaurant]);
  return { loading, success, error };
}
