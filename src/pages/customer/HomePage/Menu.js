import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import CardLoader from "../components/CardLoader";
import MenuCard from "../components/MenuCard";
import useLoadProduct from "./useLoadProduct";
import noItems from "../../../assets/images/noItems.svg";

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

  // infinity scroll
  const loadMoreElementRef = useCallback(
    (node) => {
      if (loading) return;
      // the ref is disconnted from the current element
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        // the last item is visible in screen
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
      {products.map((item, idx) => {
        return (
          <MenuCard
            key={item.id}
            ref={products.length === idx + 1 ? loadMoreElementRef : null}
            item={item}
            className="my-2"
          />
        );
      })}
      {loading && (
        <>
          <CardLoader />
          <CardLoader />
        </>
      )}
      {!loading && products.length === 0 && (
        <>
          <img
            src={noItems}
            alt="No Items Present"
            className="w-1/2 mx-auto mt-10"
          />
          <h3 className="mt-3 text-lg font-medium text-center text-light-text1 dark:text-dark-text2">
            No Items present
          </h3>
        </>
      )}
    </div>
  );
}

export default Menu;
