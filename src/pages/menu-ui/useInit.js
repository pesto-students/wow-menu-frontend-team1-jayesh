import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setRestaurant,
  setRestaurantId,
  setTable,
} from "../../store/reducers/restaurantReducer";
import { setCategory } from "../../store/reducers/productReducer";

export default function useProductSearch() {
  const dispatch = useDispatch();
  // TODO: pick up restaurant Id and table table from URL and GET restaurant details
  const restaurantId = "62f125ea334c342911733c7e";
  const table = 7;
  dispatch(setRestaurantId(restaurantId));
  dispatch(setTable(table));
  axios
    .get(
      "https://api.json-generator.com/templates/qQNrYP3Qftv6/data?access_token=sr5evx3wg5ok41tjpvfyqb0d9aesmtr1usqiix4z",
    )
    .then((res) => {
      dispatch(setRestaurant(res.data));
    });

  axios
    .get(
      `http://localhost:5000/api/categories?restaurant=${restaurantId}&isActive=true`,
    )
    .then((res) => {
      dispatch(
        setCategory(
          res.data.data.map(({ name, id }) => ({ name, id, page: 1 })),
        ),
      );
    });
}
