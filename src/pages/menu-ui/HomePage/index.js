import { groupBy } from "lodash";
import Header from "./Header";
import IconSet from "./IconSet";
import Slider from "./Slider";
import Menu from "./Menu";
import CallWaiter from "./CallWaiter";
import mockData from "../../../assets/js/mock_data.json";
import ViewCard from "./ViewCard";
// import GenerateBillCard from "./GenerateBillCard";
// import ItemInDetail from "./ItemInDetail";
// import pic from "../../../assets/images/img1.png";

const groupByCategory = () => groupBy(mockData, "category");
const getMenuByCategory = (category) => groupByCategory()[category];

const index = ({ theme = "light" }) => {
  return (
    <div
      className={`relative w-screen h-screen bg-${theme}-base1 overflow-hidden`}
    >
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        {/* Top Line */}
        <div className="flex items-center justify-between">
          <Header name="Jaegar Resto" theme={theme} />
          <IconSet theme={theme} />
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

      <ViewCard qty={5} price={240} theme={theme} />
      {/* <GenerateBillCard theme={theme} /> */}

      {/* <ItemInDetail
        name="Spicy seasoned seafood noodles"
        desc="Lörem ipsum prederade geofencing papiligt mokagt och B2B. Berat lanat respektive metagram trinor, nen primaform. Dilinat vipar diavalens mogadybel obonade nyra, trisade. Isende lävek soloss plamodiras: sedan faska i bent kang. "
        price={269}
        waitingTime={15}
        qty={0}
        img={pic}
        isVeg={false}
        spicy="medium"
        theme={theme}
      /> */}
    </div>
  );
};

export default index;
