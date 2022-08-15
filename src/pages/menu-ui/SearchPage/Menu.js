import { useRef, useCallback } from "react";
import MenuCard from "../components/MenuCard";
import CardLoader from "../components/CardLoader";

function Menu({ items, loading, hasMore, nextPage }) {
  const observer = useRef();
  const loadMoreElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) nextPage();
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <div className="mt-4 mb-36">
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
    </div>
  );
}

export default Menu;
