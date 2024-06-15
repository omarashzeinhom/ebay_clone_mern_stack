import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductContext";
import "./ProductList.scss";
import Loading from "../../Loading/Loading";
import { Product } from "../../../models/product";
import CategorySideBar from "../../Categories/CategorySideBar/CategorySideBar";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { unsplashApi } from "../../../features/unsplashConfig";

interface ProductListProps {
  products: Product[];
}


const ProductList: React.FC<ProductListProps> = ({ products: productListProp }) => {
  const { categoryName } = useParams();
  const { products, fetchProducts, getProductsByName } = useProductContext();
  const { addItemToCart, getItemQuantity } = useShoppingCart();

  const [categoryImages, setCategoryImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (categoryName) {
          // Fetch products based on category name
          await fetchProducts(); // Assuming fetchProducts fetches all products
          
          // Fetch images from Unsplash based on category name
          const result = await unsplashApi.search.getPhotos({ query: categoryName, orientation: 'landscape' });
          if (result.response) {
            const images = result.response.results.reduce((acc, photo) => {
              const product = products.find(product => product.name === photo.description);
              if (product) {
                acc[product._id] = photo.urls.small;
              }
              return acc;
            }, {} as { [key: string]: string });
            setCategoryImages(images);
          } else {
            console.error("No response from Unsplash:", result);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [categoryName, products, fetchProducts]);

  const filteredProducts = categoryName 
    ? products.filter(product => product.category === categoryName)
    : products;

  return (
    <div className="product-list-layout">
      <CategorySideBar />
      <div className="product-list">
        <h2 className="product-list__header">Products</h2>
        <h3>{categoryName}</h3>
        <ul className="product-list__product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product._id} className="product-list__product-list-item">
                <div className="product-list__product-list-item-top">
                  <a className="product-list__product-link" href={`/item/${product._id}`}>
                    <img
                      className="product-list__product-list-image"
                      src={categoryImages[product._id] || 'fallback-image-url'} 
                      alt={product.name}
                      loading="lazy"
                    />
                    <p className="product-list__product-list-name">{product.name}</p>
                  </a>
                  <div className="product-list__product-list-price-container">
                    {getItemQuantity(product?.id) === 0 && (
                      <button
                        type="button"
                        aria-label="AddProductToCart"
                        className="product-detail__button"
                        onClick={() => addItemToCart(product)}
                      >
                        Add to Cart
                      </button>
                    )}
                    <span className="product-list__product-list-price">{product.price}$</span>
                  </div>
                  <p className="product-list__product-list-category">
                    <em>Category:</em>
                    <a href={`/${encodeURIComponent(product.category)}`}>{product.category}</a>
                  </p>
                </div>
              </li>
            ))
          ) : (
            <li className="product-list__product-list-item">
              <Loading />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
