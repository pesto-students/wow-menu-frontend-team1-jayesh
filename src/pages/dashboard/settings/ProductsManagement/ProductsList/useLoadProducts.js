import { useState, useEffect } from "react";
import ProductService from "../../../../../services/products";

export default function useLoadProduct(page = 1, filterQuery) {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const { response, loading, error, getProducts } = ProductService();

  useEffect(() => {
    setProducts([]);
  }, [filterQuery]);

  useEffect(() => {
    if (filterQuery) {
      getProducts(page, filterQuery);
    } else {
      getProducts(page);
    }
  }, [page, filterQuery]);

  useEffect(() => {
    if (response) {
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts, ...response.data];
        return updatedProducts.filter(
          (p1, i, a) => a.findIndex((p2) => p2.id === p1.id) === i,
        );
      });
      setHasMore(response.data.length > 0);
    }
  }, [response]);

  return { loading, error, products, hasMore };
}
