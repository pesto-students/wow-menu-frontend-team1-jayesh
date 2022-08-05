import { useSelector } from "react-redux";
import MenuCard from "../components/MenuCard";

function Menu() {
  const products = useSelector((state) => state.product.items);
  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory,
  );
  const items = products.filter((item) => item.category === selectedCategory);
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
            img={item.img}
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;
