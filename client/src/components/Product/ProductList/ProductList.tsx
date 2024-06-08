import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductContext";
import "./ProductList.scss";
import Loading from "../../Loading/Loading";
import { Product } from "../../../models/product";
import CategorySideBar from "../../Categories/CategorySideBar/CategorySideBar";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { createApi } from 'unsplash-js';

interface ProductListProps {
  products: Product[];
}

// Unsplash API client
const unsplashApi = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_API_AK || ''
});

const ProductList: React.FC<ProductListProps> = ({ products: productListProp }) => {
  const { categoryName } = useParams();
  const { products, fetchProducts, getProductById, getProductsByName, searchQuery } = useProductContext();
  const { addItemToCart, getItemQuantity } = useShoppingCart();
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [categoryImages, setCategoryImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const productData = await getProductById(productId);
        setProduct(productData || null); // Set to null if productData is undefined
      }
      if (searchQuery) {
        const productData = await getProductsByName(searchQuery);
        setProduct(productData || null); // Set to null if productData is undefined
      }
    };

    fetchData();
  }, [productId, searchQuery, getProductById, getProductsByName]);

  useEffect(() => {
    // Fetch products based on category
    if (categoryName) {
      fetchProducts();
    }
  }, [categoryName, fetchProducts]);

  useEffect(() => {
    if (categoryName) {
      // Fetch images from Unsplash based on category
      unsplashApi.search.getPhotos({ query: categoryName, orientation: 'landscape' })
        .then(result => {
          if (result.response) {
            // Create a mapping of product IDs to images
            const images = result.response.results.reduce((acc, photo, index) => {
              const productId = filteredProducts[index]?._id;
              if (productId) {
                acc[productId] = photo.urls.small;
              }
              return acc;
            }, {} as { [key: string]: string });
            setCategoryImages(images);
          } else {
            console.error("No response from Unsplash");
          }
        })
        .catch(error => console.error("Error fetching images from Unsplash:", error));
    }
  }, [categoryName]);

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
                      src={categoryImages[product._id] || 'fallback-image-url'} // Use fetched image or fallback
                      alt={product.name}
                      loading="lazy"
                    />
                    <p className="product-list__product-list-name">{product.name}</p>
                  </a>
                  <div className="product-list__product-list-price-container">
                    {getItemQuantity(product.id) === 0 && (
                      <button
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
