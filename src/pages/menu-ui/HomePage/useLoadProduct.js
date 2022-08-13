import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import camelize from "camelize";
import { addProducts } from "../../../store/reducers/productReducer";
import useUpdateEffect from "../../../shared/hooks/useUpdateEffect";

export default function useProductSearch(page) {
  const dispatch = useDispatch();
  const restaurantId = useSelector((state) => state.restaurant.id);
  const products = useSelector((state) => state.product.items);
  const category = useSelector((state) => state.product.selectedCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useUpdateEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(
        `/api/menu-items?restaurant=${restaurantId}&is_active=true&limit=10&page_no=${page}&category=${category.id}`,
      )
      .then((res) => {
        dispatch(
          addProducts({
            products: [...products[category.name], ...camelize(res.data.data)],
            category: category.name,
          }),
        );
        setHasMore(res.data.data.length > 0);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [page]);

  return { loading, error, hasMore };
}
