// ProductDetail.tsx

import "./ProductDetail.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductContext";
import Nav from "../../Nav/Nav";
import SearchBar from "../../SearchBar/SearchBar";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
// import { Product } from "../../../models/product";

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();

  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    getItemQuantity,
    /*,removefromCart */
  } = useShoppingCart();
  const { productId } = useParams();
  const { getProductById } = useProductContext();
  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const productData = await getProductById(productId);
        setProduct(productData);
      }
    };

    fetchData();
  }, [productId, getProductById]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }
  const id = product?._id;

  const quantity = getItemQuantity(id);
  console.log(quantity);

  function handleRouting() {
    navigate(`/category/${encodeURIComponent(product?.parent)}`);
  }

  return (
    <>
      <Nav />
      <SearchBar />
      <div className="product-detail">
        <h2 className="product-detail__title">{product?.name}</h2>
        <p className="product-detail__category">
          Category: <button onClick={handleRouting}>{product?.parent}</button>
        </p>
        <p className="product-detail__price">${product?.price}</p>
        <img
          className="product-detail__image"
          alt={product?.name}
          src={product?.img}
          width={150}
          height={150}
          loading="lazy"
        />
        <p>{product?.description}</p>
        <span> {quantity}</span>

        <div className="product-detail__buttongroup">
          <button
            className="product-detail__button"
            onClick={() => increaseCartQuantity}
          >
            +
          </button>
          <button
            className="product-detail__altbutton"
            onClick={() => decreaseCartQuantity}
          >
            -
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
