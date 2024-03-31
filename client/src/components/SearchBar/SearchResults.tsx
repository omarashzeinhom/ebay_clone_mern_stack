// SearchResults.tsx
import { useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import ProductList from "../Product/ProductList/ProductList";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import Nav from "../Nav/Nav";

const SearchResults: React.FC = () => {
  const { fetchProductsBySearch, searchResults } = useProductContext();  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    // Console.log to check if searchResults are received
    console.log("Search Results in SearchResults component:", searchResults);

    // Fetch products based on the search query
    if (searchQuery) {
      fetchProductsBySearch(searchQuery);
    }
    // eslint-disable-next-line
  }, [searchQuery]); // Only fetch products when searchQuery changes
  return (
    <>
    <Nav total={0}/>
    <SearchBar/>
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      <ProductList products={searchResults || []} />
    </div>
    </>
  );
};


export default SearchResults;
