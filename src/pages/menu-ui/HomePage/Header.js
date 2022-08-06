import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDetails } from "../../../redux/reducers/restaurantReducer";

function Header() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.restaurant.details.name);
  useEffect(() => {
    dispatch(getRestaurantDetails());
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold text-light-text1 dark:text-dark-text1">
        {name}
      </h1>
      <p className="text-light-text2 dark:text-dark-text2">
        {moment().format("dddd, Do YYYY")}
      </p>
    </div>
  );
}

export default Header;
