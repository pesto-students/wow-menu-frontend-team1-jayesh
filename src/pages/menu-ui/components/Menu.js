import MenuCard from "./MenuCard";
import pic from "../../../assets/images/img1.png";

const handleInc = () => {
  // console.log(`${idx} is inc`);
};
const handleDec = () => {
  // console.log(`${idx} is dec`);
};
function Menu({ items, theme }) {
  return (
    <div>
      {items.map(({ name, desc, price, waitingTime, qty }, idx) => (
        <MenuCard
          key={name}
          className="my-2"
          name={name}
          desc={desc}
          price={price}
          waitingTime={waitingTime}
          qty={qty}
          onInc={() => handleInc(idx)}
          onDec={() => handleDec(idx)}
          img={pic}
          theme={theme}
        />
      ))}
    </div>
  );
}

export default Menu;
