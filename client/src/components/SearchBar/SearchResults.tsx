// SearchResults.tsx
import { useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import Nav from "../Nav/Nav";

const SearchResults: React.FC = () => {
  const { getProductsByName, searchResults } = useProductContext();  
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    // Console.log to check if searchResults are received
    console.log("Search Results in SearchResults component:", searchResults);

    // Fetch products based on the search query
    if (searchQuery) {
      getProductsByName(searchQuery);
    }
    // eslint-disable-next-line
  }, [searchQuery]); // Only fetch products when searchQuery changes
const strResults =  JSON.stringify(searchResults);

  return (
    <>
    <Nav total={0}/>
    <SearchBar/>
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      {/* TO DO Pass Search Results as Objects and the Link for Each Object using getProductById */}
      {strResults}

     {searchResults !== undefined && (
      <>
       {
        searchResults?.map((result, index)=>{
          return (
            <>
            {result.name}
            {result.businessId}
            {result.img}
            {result.file}
            {result.parent}
            {result.category}
            {result.quantity}
            {result.price}
            </>
          )
        })
      }
      </>
     )}
    </div>
    </>
  );
};


export default SearchResults;
