import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByCategory } from "../../../redux/reducers/menuReducer";
import Header from "./Header";
import IconSet from "./IconSet";
import Slider from "./Slider";
import Menu from "./Menu";
import CallWaiter from "./CallWaiter";
import ItemInDetail from "./ItemInDetail";
import FilterPopup from "./FilterPopup";
// import ViewCard from "./ViewCard";
// import GenerateBillCard from "./GenerateBillCard";

function HomePage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.menu.categories);
  const dishesByCategory = useSelector((state) => state.menu.dishesByCategory);
  const [category, setCategory] = useState(categories[0]);
  const [detail, setDetail] = useState({
    item: "",
    show: false,
  });
  const [filter, setFilter] = useState(false);

  const handleCategory = (item) => {
    setCategory(item);
    dispatch(getProductByCategory(item));
  };
  const hideDetail = () => {
    setDetail({ ...detail, show: !detail.show });
  };
  const showDetail = (item) => {
    setDetail({ item, show: !detail.show });
  };
  const toggleFilter = () => {
    setFilter(!filter);
  };

  useEffect(() => {
    dispatch(getProductByCategory(category));
  }, [dispatch]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        {/* Top Line */}
        <div className="flex items-center justify-between">
          <Header name="Jaegar Resto" />
          <IconSet onFilter={toggleFilter} />
        </div>
        {/* Slider */}
        <Slider
          categories={categories}
          active={category}
          onClick={handleCategory}
        />
        <Menu items={dishesByCategory} onClick={showDetail} />
      </div>

      {/* <ViewCard qty={5} price={240} />
      <GenerateBillCard /> */}
      <CallWaiter />

      {detail.show && <ItemInDetail item={detail.item} onClose={hideDetail} />}
      {filter && <FilterPopup onClose={toggleFilter} />}
    </div>
  );
}

export default HomePage;
