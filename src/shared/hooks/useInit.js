import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import camelize from "camelize";
import {
  setRestaurant,
  setRestaurantId,
  setTable,
} from "../../store/reducers/restaurantReducer";
import { setProducts, setCategory } from "../../store/reducers/productReducer";

export default function useProductSearch() {
  const dispatch = useDispatch();
  // TODO: pick up restaurant Id and table table from URL and GET restaurant details
  const restaurantId = "62f125ea334c342911733c7e";
  const table = 7;
  dispatch(setRestaurantId(restaurantId));
  dispatch(setTable(table));
  useEffect(() => {
    axios
      .get(
        "https://api.json-generator.com/templates/qQNrYP3Qftv6/data?access_token=sr5evx3wg5ok41tjpvfyqb0d9aesmtr1usqiix4z",
      )
      .then((res) => {
        dispatch(setRestaurant(camelize(res.data)));
      });

    axios
      .get(`/api/categories?restaurant=${restaurantId}&is_active=true`)
      .then((res) => {
        dispatch(
          setCategory(
            camelize(
              res.data.data.map(({ name, id }) => ({ name, id, page: 1 })),
            ),
          ),
        );
      });
    axios
      .get(
        `/api/menu-items/group-by-category?restaurant=${restaurantId}&limit=10`,
      )
      .then((res) => {
        dispatch(setProducts(camelize(res.data.data)));
      });
  }, [restaurantId]);

  return {};
}
