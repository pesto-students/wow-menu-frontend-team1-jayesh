import { useRef, useCallback } from "react";
import MenuCard from "../components/MenuCard";
import CardLoader from "../components/CardLoader";
import noItems from "../../../assets/images/noItems.svg";

function Menu({ items, loading, hasMore, nextPage }) {
  const observer = useRef();
  // infinity scroll
  const loadMoreElementRef = useCallback(
    (node) => {
      if (loading) return;
      // the ref is disconnted from the current element
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        // the last item is visible in screen
        if (entries[0].isIntersecting && hasMore) nextPage();
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <div className="w-full mx-auto mt-4 mb-36 md:w-4/6 lg:w-2/6">
      {items.map((item, idx) => {
        if (items.length === idx + 1)
          return (
            <MenuCard
              ref={loadMoreElementRef}
              key={item.id}
              item={item}
              className="my-2"
            />
          );
        return <MenuCard key={item.id} item={item} className="my-2" />;
      })}
      {loading && (
        <>
          <CardLoader />
          <CardLoader />
        </>
      )}
      {!loading && items.length === 0 && (
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
