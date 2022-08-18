import { useState, useEffect } from "react";
import axios from "axios";
// import { useSelector } from "react-redux";

export default function useProductSearch(search, page, filter) {
  // const restaurantId = useSelector((state) => state.restaurant.id);
  const restaurantId = "62f125ea334c342911733c7e";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setProducts([]);
  }, [search, filter]);
  useEffect(() => {
    setLoading(true);
    setError(false);
    let filterQuery;
    if (filter === "veg") filterQuery = "&isVeg=true";
    else if (filter === "nonveg") filterQuery = "&isVeg=false";
    else filterQuery = "";
    const searchQuery = search.length > 0 ? `&name=${search}` : "";
    axios
      .get(
        `https://wow-menu-staging.herokuapp.com/api/menu-items?restaurant=${restaurantId}&limit=10&pageNo=${page}${searchQuery}${filterQuery}`,
      )
      .then((res) => {
        setProducts((prevProducts) => {
          return [...prevProducts, ...res.data.data];
        });
        setHasMore(res.data.data.length > 0);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [search, page, filter]);

  return { loading, error, products, hasMore };
}
