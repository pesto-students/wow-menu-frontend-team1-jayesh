import moment from "moment";
import { useSelector } from "react-redux";

function Header() {
  const name = useSelector((state) => state.restaurant.details.name);
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
