import { useState, useEffect } from "react";
import ProductService from "../../../services/products";

export default function useProductSearch(search, page, filter) {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const { response, loading, error, getProducts } = ProductService();

  useEffect(() => {
    setProducts([]);
  }, [search, filter]);

  useEffect(() => {
    const query = {};
    if (filter === "veg") query.isVeg = true;
    else if (filter === "nonveg") query.isVeg = false;
    if (search.length > 0) query.name = search;
    getProducts(page, { isActive: true, ...query });
  }, [search, page, filter]);

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
