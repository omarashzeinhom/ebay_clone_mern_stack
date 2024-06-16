import { useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { RootState, AppDispatch } from "../../store/store";
import { fetchProductsByName } from "../../store/productSlice";
import "./SearchResults.scss";
import { CategorySideBar, Nav } from "..";
import { useShoppingCart } from "../../context/";

const SearchResults: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";
  
  const searchResults = useSelector((state: RootState) => state.products.searchResults);
  const { addItemToCart, getItemQuantity } = useShoppingCart();

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchProductsByName(searchQuery));
    }
  }, [searchQuery, dispatch]);

  const productLink = (productId: string) => `/item/${productId}`;
  const flattenedResults = searchResults?.flatMap((innerArray) => innerArray);
  const strQuery = JSON.stringify(searchQuery);

  return (
    <>
      <Nav total={0} pageTitle="SearchResults" />
      <SearchBar />
      <div className="product-list-layout">
        <CategorySideBar />
        <div className="product-list">
          <h2 className="product-list__header">
            Searched Results For {strQuery}
          </h2>
          <ul className="product-list__product-list">
            {flattenedResults !== undefined && flattenedResults.length !== 0 ? (
              flattenedResults.map((result: any) => (
                <li
                  key={result?._id}
                  className="product-list__product-list-item"
                >
                  <div className="product-list__product-list-item-top">
                    <a
                      className="product-list__product-link"
                      href={`${productLink(result?._id)}`}
                    >
                      <img
                        className="product-list__product-list-image"
                        src={result?.img}
                        alt={result?.name}
                        loading="lazy"
                      />
                      <p className="product-list__product-list-name">
                        {result?.name}
                      </p>
                    </a>
                    <div className="product-list__product-list-price-container">
                      {getItemQuantity(result?._id) === 0 && (
                        <button aria-label="AddToCartButton"
                          className="product-list__product-detail-button"
                          onClick={() => addItemToCart(result)}
                        >
                          Add to Cart
                        </button>
                      )}
                      <span className="product-list__product-list-price">
                        {result?.price}$
                      </span>
                    </div>
                    <p className="product-list__product-list-category">
                      <em>Category:</em>
                      <br />
                      <br />
                      <a
                        href={`/category/${encodeURIComponent(
                          result?.category
                        )}`}
                      >
                        {result?.category}
                      </a>
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p>No results found for "{searchQuery}"</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
