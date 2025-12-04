import { createContext, useContext, useEffect, useState } from "react";
import { transformProduct } from "../utils/productUtils";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("https://api.dovinigears.ng/products");
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      // Validate data structure before processing
      if (!data || !data.data || !Array.isArray(data.data)) {
        throw new Error("Invalid API response structure");
      }

      const transformedProducts = data.data
        .filter((item) => item && typeof item === "object") // Filter out null/undefined items
        .map(transformProduct)
        .filter((product) => product && product.id); // Filter out invalid products

      setProducts(transformedProducts);
    } catch (err) {
      console.warn("Failed to fetch products:", err.message);
      setError(err.message);

      // Set empty array as fallback instead of leaving products undefined
      if (products.length === 0) {
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
