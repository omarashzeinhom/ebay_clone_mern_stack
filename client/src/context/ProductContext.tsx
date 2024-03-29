import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Product } from "../models/product";
import { productService } from "../services/productService";

interface ProductContextProps {
  children: ReactNode;
}

interface ProductContextValue {
  products: Product[];
  selectedCategory: string;
  setCategory: (category: string) => void;
  fetchProductsBySearch: (searchQuery: string) => Promise<void>;
  fetchProducts: (categoryName?: string) => Promise<void>; 
  getProductById: (productId: string) => Promise<Product | undefined>;
  searchResults: Product[];
  setSearchResults: (searchResults: Product[]) => void; // Define setSearchResults
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

export const ProductProvider: React.FC<ProductContextProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const getProductById = async (productId: string): Promise<Product | undefined> => {
    try {
      const product = await productService.getProductById(productId);
      return product;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      return undefined;
    }
  };

  const fetchProducts = async (categoryName?: string) => {
    try {
      let fetchedProducts;
      if (categoryName) {
        fetchedProducts = await productService.getProductsByCategory(categoryName);
      } else {
        fetchedProducts = await productService.getAllProducts();
      }
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  const setCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const fetchProductsBySearch = async (searchQuery: string) => {
    try {
      const foundProducts = await productService.getProductsBySearch(searchQuery);
      setSearchResults(foundProducts);
    } catch (error) {
      console.error("Error fetching products by search:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        setSearchResults,
        products,
        selectedCategory,
        setCategory,
        fetchProducts,
        getProductById,
        searchResults,
        fetchProductsBySearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
