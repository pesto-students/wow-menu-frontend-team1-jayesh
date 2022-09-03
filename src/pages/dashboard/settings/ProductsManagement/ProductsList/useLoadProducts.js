import { useState, useEffect } from "react";
import ProductService from "../../../../../services/products";

export default function useLoadProduct(search, page = 1, filterQuery) {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const { response, loading, error, getProducts, updateProductState } =
    ProductService();

  useEffect(() => {
    setProducts([]);
  }, [search, filterQuery]); // ,

  useEffect(() => {
    const query = {};
    if (search.length > 0) query.name = search;
    getProducts(page, { ...filterQuery, ...query });
  }, [search, page, filterQuery]);

  useEffect(() => {
    if (response && Array.isArray(response.data)) {
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts, ...response.data];
        return updatedProducts.filter(
          (p1, i, a) => a.findIndex((p2) => p2.id === p1.id) === i,
        );
      });
      setHasMore(response.data.length > 0);
    } else if (response && !Array.isArray(response.data)) {
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((item) => {
          if (item.id === response.data.id) return response.data;
          return item;
        });
        return updatedProducts;
      });
    }
  }, [response]);

  const handleChangeActive = (id, query) => {
    updateProductState(id, query);
  };
  const handleChangeAvailable = (id, query) => {
    updateProductState(id, query);
  };

  return {
    loading,
    error,
    products,
    hasMore,
    handleChangeActive,
    handleChangeAvailable,
  };
}
