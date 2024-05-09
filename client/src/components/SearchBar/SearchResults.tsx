import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useProductContext,useShoppingCart  } from "../../context/";
import "./SearchResults.scss";
import { CategorySideBar, Nav } from "..";

const SearchResults: React.FC = () => {
  const { getProductsByName, searchResults } = useProductContext();
  const [product, setProduct] = useState<any | null>(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";

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
  }, [searchQuery, getProductsByName, product]);

  const productLink = (productId: string) => `/item/${productId}`;
  const id = product?.id;
  const quantity = getItemQuantity(id);
  const flattenedResults = searchResults?.flatMap((innerArray) => innerArray);

  const strQuery = JSON.stringify(searchQuery);

  return (
    <>
      <Nav total={0} pageTitle="SearchResults"/>
      <SearchBar />
      <div className="product-list-layout">
        <CategorySideBar />
        <div className="product-list">
          <h2 className="product-list__header">
            Searched Results For {strQuery}
          </h2>

          <ul className="product-list__product-list">
            {flattenedResults !== undefined && flattenedResults.length > 0 ? (
              flattenedResults.map((result: any, index: any) => (
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
                      {quantity === 0 && (
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
                    <div></div>
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
