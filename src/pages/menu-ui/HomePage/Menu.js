import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
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
            <AnimatePresence exitBeforeEnter key={item.id}>
              <MenuCard className="my-2" item={item} />
            </AnimatePresence>
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
