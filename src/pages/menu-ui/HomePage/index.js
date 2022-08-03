import { useState } from "react";
import { groupBy } from "lodash";
import Header from "./Header";
import IconSet from "./IconSet";
import Slider from "./Slider";
import Menu from "./Menu";
import CallWaiter from "./CallWaiter";
import mockData from "../../../assets/js/mock_data.json";
// import ViewCard from "./ViewCard";
// import GenerateBillCard from "./GenerateBillCard";
import ItemInDetail from "./ItemInDetail";
import FilterPopup from "./FilterPopup";

const groupByCategory = () => groupBy(mockData, "category");
const getMenuByCategory = (category) => groupByCategory()[category];
const categories = Object.keys(groupByCategory());

function HomePage() {
  const [category, setCategory] = useState(categories[0]);
  const [detail, setDetail] = useState({
    item: "",
    show: false,
  });
  const [filter, setFilter] = useState(false);
  const handleCategory = (item) => {
    setCategory(item);
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
        <Menu items={getMenuByCategory(category)} onClick={showDetail} />
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
