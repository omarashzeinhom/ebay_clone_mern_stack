// ProductContext.tsx
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "../models/product";
import { productService } from "../services/productService";

interface ProductContextProps {
  children: ReactNode;
}

interface ProductContextValue {
  products: Product[];
  selectedCategory: string;
  setCategory: (category: string) => void;
  fetchProducts: () => void; // Add fetchProducts to the interface
  getProductById: (productId: string) => Promise<Product | undefined>;
  createProduct: () => void;
  readProduct: () => void;
  updateProduct: () => void;
  deleteProduct: () => void;
  searchResults: Product[]; // Add this line
  setSearchResults: (results: Product[]) => void; // Add this line

}

const ProductContext = createContext<ProductContextValue | undefined>(
  undefined
);

export const ProductProvider: React.FC<ProductContextProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);



  const getProductById = async (
    productId: string
  ): Promise<Product | undefined> => {
    try {
      // You need to implement a function in productService to get a product by ID
      const product = await productService.getProductById(productId);
      return product;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      return undefined;
    }
  };

  const fetchProducts = async (searchQuery?: string, categoryName?: string) => {
    try {
      let products;

      if (searchQuery) {
        products = await productService.getProductsBySearch(searchQuery);
      } else if (categoryName) {
        products = await productService.getProductsByCategory(categoryName);
      } else {
        products = await productService.getAllProducts();
      }

      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const setCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const createProduct = async () => {
    try {
      // Implement create product functionality
    } catch (error) {
      console.error(`Error creating a product: ${error}`);
    }
  };

  const updateProduct = async () => {
    try {
      // Implement update product functionality
    } catch (error) {
      console.error(`Error updating a product: ${error}`);
    }
  };

  const readProduct = async () => {
    try {
      // Implement read product functionality
    } catch (error) {
      console.error(`Error reading a product: ${error}`);
    }
  };

  const deleteProduct = async () => {
    try {
      // Implement delete product functionality
    } catch (error) {
      console.error(`Error deleting a product: ${error}`);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        createProduct,
        updateProduct,
        readProduct,
        deleteProduct,
        products,
        selectedCategory,
        setCategory,
        fetchProducts,
        getProductById,
        searchResults, 
        setSearchResults,
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
