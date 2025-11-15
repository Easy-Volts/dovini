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

      const res = await fetch("https://api.dovinigears.ng/products"); 
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      const transformedProducts = data.data.map(transformProduct);
      setProducts(transformedProducts);
    } catch (err) {
      setError(err.message);
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
