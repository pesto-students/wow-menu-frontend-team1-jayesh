import { useSelector } from "react-redux";
import CardLoader from "../components/CardLoader";
import MenuCard from "../components/MenuCard";

function Menu() {
  const products = useSelector((state) => state.product.items);
  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory,
  );
  const items = products
    .filter((item) => item.category === selectedCategory)
    .sort(
      (firstItem, secondItem) =>
        Number(secondItem.isAvailable) - Number(firstItem.isAvailable),
    );
  return (
    <div className="mt-4 mb-36">
      <div>
        {items.length > 0 ? (
          items.map((item) => (
            <MenuCard key={item.id} className="my-2" item={item} />
          ))
        ) : (
          <>
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;
