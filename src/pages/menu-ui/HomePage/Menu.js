// import ItemInDetail from "./ItemInDetail";
import MenuCard from "../components/MenuCard";
// import pic from "../../../assets/images/img1.png";

const handleInc = () => {
  // console.log(`${idx} is inc`);
};
const handleDec = () => {
  // console.log(`${idx} is dec`);
};
const itemDetails = () => {
  // console.log("In ItemDetails");
  // console.log(`${JSON.stringify(item)}`);
  // window.alert("itemDetails", item );
};

function Menu({ items, theme }) {
  return (
    <div className="mt-4 mb-36">
      <div>
        {items.map((item, idx) => (
          <MenuCard
            key={item.name}
            className="my-2"
            name={item.name}
            desc={item.desc}
            price={item.price}
            waitingTime={item.waitingTime}
            qty={item.qty}
            onInc={() => handleInc(idx)}
            onDec={() => handleDec(idx)}
            img={item.img}
            theme={theme}
            onTouchEnd={() => itemDetails(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;
