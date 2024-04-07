import { useEffect, useState } from "react";
import { useLocation, /**useParams  */} from "react-router-dom";
import SearchBar from "./SearchBar";
import Nav from "../Nav/Nav";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useProductContext } from "../../context/ProductContext";

const SearchResults: React.FC = () => {
  const { getProductsByName, searchResults } = useProductContext();
  const [product, setProduct] = useState<any | null>(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";
  //const { productId } = useParams<{ productId: string }>();

  const { addItemToCart, getItemQuantity } = useShoppingCart();
  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        const productData = await getProductsByName(searchQuery);
        setProduct(productData);
      }
    };
  
    fetchData();
  
    console.log(product); // This will log the previous state, not the updated state
  }, [searchQuery, getProductsByName,product]);


 // const strSearchedQueryResults = JSON.stringify(searchResults);
  
 console.log("searchResults not stringified",searchResults);

  const productLink = (productId: string) => `/item/${productId}`;
  const id = product?.id;

  const quantity = getItemQuantity(id);
  const flattenedResults = searchResults?.flatMap(innerArray => innerArray);

  return (
    <>
      <Nav total={0} />
      <SearchBar />
      <div>
        <h2>JSON String Search Results for "{searchQuery}"</h2>
      
        <h3> Object Searched Query Results</h3>
        {flattenedResults !== undefined && flattenedResults.length > 0 ? (
          flattenedResults.map((result: any, index: any) => (
            <>
              <li key={result?._id} className="result-list__result-list-item">
                <div className="result-list__result-list-item-top">
                  <a
                    className="result-list__result-link"
                    href={`${productLink(result?._id)}`}
                  >
                    <img
                      className="result-list__result-list-image"
                      src={result?.img}
                      alt={result?.name}
                      loading="lazy"
                    />
                    <p className="result-list__result-list-name">
                      {result?.name}
                    </p>
                  </a>
                  <div className="result-list__result-list-price-container">
                    {quantity === 0 && (
                      <button
                        className="result-detail__button"
                        onClick={() => addItemToCart(result)}
                      >
                        Add to Cart
                      </button>
                    )}
                    <span className="result-list__result-list-price">
                      {result?.price}$
                    </span>
                  </div>

                  <p className="result-list__result-list-category">
                    <em>Category:</em>
                    <br />
                    <br />
                    <a href={`${encodeURIComponent(result?.category)}`}>
                      {result?.category}
                    </a>
                  </p>
                  <div></div>
                </div>
              </li>
            </>
          ))
        ) : (
          <p>No results found for "{searchQuery}"</p>
        )}
      </div>
    </>
  );
};

export default SearchResults;
