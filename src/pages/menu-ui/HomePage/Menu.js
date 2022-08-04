import { useSelector } from "react-redux";
import MenuCard from "./MenuCard";

function Menu({ onClick }) {
  const items = useSelector((state) => state.menu.dishesByCategory);
  return (
    <div className="mt-4 mb-36">
      <div>
        {items.map((item) => (
          <MenuCard
            key={item.id}
            className="my-2"
            id={item.id}
            name={item.name}
            desc={item.desc}
            price={item.price}
            waitingTime={item.waitingTime}
            qty={item.qty}
            img={item.img}
            onClick={() => onClick(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;
