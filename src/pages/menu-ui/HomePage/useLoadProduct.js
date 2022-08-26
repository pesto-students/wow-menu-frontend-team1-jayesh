import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import useUpdateEffect from "../../../shared/hooks/useUpdateEffect";

export default function useProductSearch(page, category) {
  const restaurantId = useSelector((state) => state.restaurant.id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setProducts([]);
  }, [category]);

  useUpdateEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(
        `https://wow-menu-staging.herokuapp.com/api/menu-items?restaurant=${restaurantId}&isActive=true&limit=10&pageNo=${page}&category=${category.id}`,
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
  }, [page, category]);

  return { loading, error, products, hasMore };
}
