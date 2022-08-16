import { useState, useEffect } from "react";
import axios from "axios";
// import { useSelector } from "react-redux";
import camelize from "camelize";

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
    if (filter === "veg") filterQuery = "&is_veg=true";
    else if (filter === "nonveg") filterQuery = "&is_veg=false";
    else filterQuery = "";
    const searchQuery = search.length > 0 ? `&name=${search}` : "";
    axios
      .get(
        `http://localhost:5000/api/menu-items?restaurant=${restaurantId}&limit=10&page_no=${page}${searchQuery}${filterQuery}`,
      )
      .then((res) => {
        setProducts((prevProducts) => {
          return [...prevProducts, ...camelize(res.data.data)];
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
