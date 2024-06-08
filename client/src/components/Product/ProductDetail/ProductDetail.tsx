import "./ProductDetail.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductContext";
import SearchBar from "../../SearchBar/SearchBar";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { Nav } from "../..";
import { createApi } from 'unsplash-js';

// Unsplash API client
const unsplashApi = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_API_AK || ''
});

type ProductDetailProps = {
  total: number;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ total }) => {
  const navigate = useNavigate();
  const { addItemToCart, decreaseCartQuantity, getItemQuantity } = useShoppingCart();
  const { productId } = useParams();
  const { getProductById } = useProductContext();
  const [product, setProduct] = useState<any | null>(null);
  const [unsplashImage, setUnsplashImage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const productData = await getProductById(productId);
        setProduct(productData);
      }
    };

    fetchData();
  }, [productId, getProductById]);

  useEffect(() => {
    const fetchUnsplashImage = async () => {
      if (product?.category) {
        try {
          const result = await unsplashApi.search.getPhotos({
            query: product.category,
            orientation: 'landscape',
            perPage: 1
          });

          if (result.response?.results[0]) {
            setUnsplashImage(result.response.results[0].urls.small);
          } else {
            console.error("No image found for category from Unsplash");
          }
        } catch (error) {
          console.error("Error fetching image from Unsplash:", error);
        }
      }
    };

    if (product) {
      fetchUnsplashImage();
    }
  }, [product]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const id = product?.id;
  const quantity = getItemQuantity(id);

  function handleRouting() {
    navigate(`/category/${encodeURIComponent(product?.category)}`);
  }

  return (
    <>
      <Nav total={total} />
      <SearchBar />
      <div className="product-detail">
        <h2 className="product-detail__title">{product?.name}</h2>
        <p className="product-detail__price">${product?.price}</p>
        <img
          className="product-detail__image"
          alt={product?.name}
          src={unsplashImage || product?.img || 'fallback-image-url'}
          width={150}
          height={150}
          loading="lazy"
        />
        <p className="product-detail__category">
          <strong>
            <em>Category: </em>
          </strong>{" "}
          <button
            aria-label={"CategoryButtonFor" + product?.category}
            onClick={handleRouting}
            className="product-detail__button"
          >
            {product?.category}
          </button>
        </p>
        <p>
          <strong>
            <em>Description :</em>{" "}
          </strong>
          {product?.description}
        </p>
        <span>
          <strong>
            <em>Available Quantity :</em>
          </strong>{" "}
          {product?.quantity}
        </span>
        <p>
          <strong>
            <em>Selected Quantity :</em>
          </strong>{" "}
          {quantity}
        </p>

        <div className="product-detail__buttongroup">
          {quantity === 0 && (
            <button
              aria-label="AddProductToCart"
              className="product-detail__button"
              onClick={() => addItemToCart(product)}
            >
              Add to Cart
            </button>
          )}
          <button
            aria-label="DecreaseItemQuantity"
            className="product-detail__altbutton"
            onClick={() => decreaseCartQuantity(id)}
          >
            -
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
