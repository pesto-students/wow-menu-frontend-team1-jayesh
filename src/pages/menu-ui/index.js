import { groupBy } from "lodash";
import Header from "./components/Header";
import IconSet from "./components/IconSet";
import Slider from "./components/Slider";
import Menu from "./components/Menu";
import CallWaiter from "./components/CallWaiter";
import mockData from "../../assets/js/mock_data.json";

const groupByCategory = () => groupBy(mockData, "category");
const getMenuByCategory = (category) => groupByCategory()[category];

const index = ({ theme = "light" }) => {
  return (
    <div
      className={`relative w-screen h-screen bg-${theme}-base1 overflow-hidden`}
    >
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        {/* Top Line */}
        <div className="grid grid-cols-5">
          <div className="col-span-3">
            <Header name="Jaegar Resto" theme={theme} />
          </div>
          <div className="col-span-2">
            <IconSet theme={theme} />
          </div>
        </div>
        {/* Slider */}
        <Slider
          theme={theme}
          categories={[
            "Hot Dishes",
            "Cold Dishes",
            "Soup",
            "Appetizer",
            "Desserts",
            "Drinks",
          ]}
        />
        <div>
          <Menu theme={theme} items={getMenuByCategory("Hot Dishes")} />
        </div>
      </div>
      <CallWaiter />
      Fab button to call Waiter
    </div>
  );
};

export default index;
