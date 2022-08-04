import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import IconSet from "./IconSet";
import Slider from "./Slider";
import Menu from "./Menu";
import CallWaiter from "./CallWaiter";
import ItemInDetail from "./ItemInDetail";
import FilterPopup from "./FilterPopup";
import ViewCard from "./ViewCard";
// import GenerateBillCard from "./GenerateBillCard";

function HomePage() {
  const itemsInCart = useSelector((state) => state.menu.itemsInCart);
  const [showDetail, setShowDetail] = useState(false);
  const [showfilter, setShowFilter] = useState(false);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };
  const toggleFilter = () => {
    setShowFilter(!showfilter);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        <div className="flex items-center justify-between">
          <Header name="Jaegar Resto" />
          <IconSet onFilter={toggleFilter} />
        </div>
        <Slider />
        <Menu onClick={toggleDetail} />
      </div>

      {itemsInCart > 0 && <ViewCard qty={itemsInCart} />}
      {/* <GenerateBillCard /> */}
      <CallWaiter />

      {showDetail && <ItemInDetail onClose={toggleDetail} />}
      {showfilter && <FilterPopup onClose={toggleFilter} />}
    </div>
  );
}

export default HomePage;
