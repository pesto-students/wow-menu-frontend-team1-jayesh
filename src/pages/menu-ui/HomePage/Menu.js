import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import CardLoader from "../components/CardLoader";
import MenuCard from "../components/MenuCard";
import useLoadProduct from "./useLoadProduct";

function Menu() {
  const observer = useRef();
  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory,
  );
  const [page, setPage] = useState(1);

  const { loading, products, hasMore } = useLoadProduct(page, selectedCategory);

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
    <div className="mt-4 mb-36">
      <div>
        {products.length > 0 ? (
          products.map((item, idx) => {
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
          })
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
