// SearchResults.tsx
import { useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import ProductList from "../Product/ProductList/ProductList";
import { useLocation } from "react-router-dom";

const SearchResults: React.FC = () => {
  const { fetchProducts, searchResults } = useProductContext();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    // Console.log to check if searchResults are received
    console.log("Search Results in SearchResults component:", searchResults);

    // Fetch products based on the search query
    fetchProducts();
    // eslint-disable-next-line
  }, [fetchProducts]);

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      <ProductList products={searchResults} />
    </div>
  );
};


export default SearchResults;
