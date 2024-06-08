import React, { useState, useEffect } from "react";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import CartItem from "../CartItem/CartItem";
import { currencyFormatter } from "../../../utilities/currencyFormatter";
import { useProductContext } from "../../../context/ProductContext";
import Checkout from "../CheckOut/CheckOut";
import { createApi } from "unsplash-js"; // Import from unsplash-js package

import "./ShoppingCart.scss";

type ShoppingCartProps = {
  total: number;
};

const unsplashApi = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_API_AK || "",
});

const ShoppingCart: React.FC<ShoppingCartProps> = ({ total }) => {
  const { cartItems, cartQuantity, clearCart } = useShoppingCart();
  const { products } = useProductContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productImages, setProductImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchProductImages = async () => {
      const imagePromises = products.map(async (product) => {
        try {
          const result = await unsplashApi.search.getPhotos({
            query: product.name,
            orientation: "landscape",
            perPage: 1,
          });

          if (result.response?.results[0]) {
            return { [product.id]: result.response.results[0].urls.small };
          }
        } catch (error) {
          console.error(`Error fetching image for ${product.name} from Unsplash:`, error);
        }
        return { [product.id]: "" };
      });

      const images = await Promise.all(imagePromises);
      const imagesMap = images.reduce((acc, cur) => ({ ...acc, ...cur }), {});
      setProductImages(imagesMap);
    };

    fetchProductImages();
  }, [products]);

  return (
    <>
      <span onClick={() => setIsModalVisible(true)}>
        {isModalVisible === false && <>{cartQuantity}</>}
        🛒
      </span>

      <div className={`modal ${isModalVisible ? "visible" : ""}`}>
        <div className="modal-content">
          <button
            type="button"
            aria-label="ShowShoppingCart"
            onClick={() => setIsModalVisible(false)}
          >
            &times;
          </button>

          <h2>Shopping Cart</h2>
          {cartQuantity > 0 && (
            <>
              {cartItems.map((item, index) => (
                <React.Fragment key={item?.id + index}>
                  <CartItem
                    price={item?.price}
                    parent={item?.parent}
                    _id={item?._id}
                    name={item?.name}
                    img={productImages[item?.id] || ""} // Use fetched image or empty string as fallback
                    id={item?.id}
                    quantity={item?.quantity}
                    category={item?.category}
                  />
                </React.Fragment>
              ))}
            </>
          )}
          {cartQuantity > 0 && (
            <button aria-label="EmptyCartButton" onClick={clearCart}>
              Clear Cart
            </button>
          )}
          {cartQuantity === 0 && (
            <>
              <p>No Products Added👽</p>
            </>
          )}
          <div className="total">
            Total Items: {cartQuantity}
            <br />
            Total:{" "}
            {currencyFormatter(
              cartItems.reduce((total, cartItem) => {
                const product = products.find((p) => p.id === cartItem.id);
                return total + (product?.price || 0) * cartItem?.quantity;
              }, 0)
            )}
          </div>
          <Checkout total={total} />
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
