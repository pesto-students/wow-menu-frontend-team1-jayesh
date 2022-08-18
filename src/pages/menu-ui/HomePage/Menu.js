import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import CardLoader from "../components/CardLoader";
import MenuCard from "../components/MenuCard";
import useLoadProduct from "./useLoadProduct";
import useLocalStorage from "../../../shared/hooks/useLocalStorage";
import { setCart } from "../../../store/reducers/cartReducer";
import useUpdateEffect from "../../../shared/hooks/useUpdateEffect";

function Menu() {
  const dispatch = useDispatch();
  const observer = useRef();
  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory,
  );
  const cart = useSelector((state) => state.cart.items);
  const [storedCart, setStoredCart] = useLocalStorage("cart", cart);
  const [page, setPage] = useState(1);

  const { loading, products, hasMore } = useLoadProduct(page, selectedCategory);
  useEffect(() => {
    dispatch(setCart(storedCart));
  }, []);
  useUpdateEffect(() => {
    setStoredCart(cart);
  }, [cart]);
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const loadMoreElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <div className="w-full mx-auto mt-4 md:w-4/6 lg:w-2/6 mb-36">
      <div>
        {products.map((item, idx) => {
          if (products.length === idx + 1)
            return (
              <AnimatePresence exitBeforeEnter key={item.id}>
                <MenuCard
                  ref={loadMoreElementRef}
                  item={item}
                  className="my-2"
                />
              </AnimatePresence>
            );
          return (
            <AnimatePresence exitBeforeEnter key={item.id}>
              <MenuCard item={item} className="my-2" />
            </AnimatePresence>
          );
        })}
        {loading && (
          <>
            <CardLoader />
            <CardLoader />
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;
