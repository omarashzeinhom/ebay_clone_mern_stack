import "./ProductDetail.scss";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { fetchProductById } from "../../../store/productSlice";
import SearchBar from "../../SearchBar/SearchBar";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { Nav } from "../..";

type ProductDetailProps = {
  total: number;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ total }) => {
  const navigate = useNavigate();
  const { addItemToCart, decreaseCartQuantity, getItemQuantity } = useShoppingCart();
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.products.productDetail);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, dispatch]);

  // Ensure id is always treated as a number
  const id = product?.id || 0; // Assuming id should be a number, use 0 as fallback if product?.id is falsy
  const quantity = getItemQuantity(id);

  function handleRouting() {
    navigate(`/category/${encodeURIComponent(product?.category ?? "")}`);
  }

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Nav total={total} pageTitle="" />
      <SearchBar />
      <div className="product-detail">
        <h2 className="product-detail__title">{product?.name}</h2>
        <p className="product-detail__price">${product?.price}</p>
        <img
          className="product-detail__image"
          alt={product?.name}
          src={product?.img}
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

        <div className="product-detail__buttongroup">
          {quantity === 0 && (
            <button
              aria-label="AddProductToCart"
              className="product-detail__button"
              // onClick={() => addItemToBid(product)}
            >
              Place Bid
            </button>
          )}
          <button
            aria-label="DecreaseItemQuantity"
            className="product-detail__altbutton"
            // onClick={() => buyFinalPriceFromBid(id)}
          >
            Buy Now
          </button>
          {/* Add additional conditions and functionality for bid if needed */}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
