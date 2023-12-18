import "./ShoppingCart.scss";
import { useState } from "react";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import CartItem from "../CartItem/CartItem";
import { currencyFormatter } from "../../../utilities/currencyFormatter";
import { useProductContext } from "../../../context/ProductContext";
import { TbShoppingCart } from "react-icons/tb";
import { Product } from "../../../models/product";
import Checkout from "../CheckOut/CheckOut";
import React from "react";

type ShoppingCartProps = {
  total: number; // Add total as a prop

};

export default function ShoppingCart({  total }: ShoppingCartProps) {
  const { cartItems, cartQuantity } = useShoppingCart();
  const { products } = useProductContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const storeProducts: Product[] = products;

  /* <-----| DEBUG |-----> */
  // const cartItemsStr = JSON.stringify(cartItems);
  //console.log(`cartItems----->${cartItemsStr}`);
  // console.log('storeProducts:', storeProducts);

  return (
    <>
      <span onClick={() => setIsModalVisible(true)}>
        {isModalVisible === false && <>{cartQuantity}</>}

        <TbShoppingCart className="app__nav-rightIcon" />
      </span>

      <div className={`modal ${isModalVisible ? "visible" : ""}`}>
        <div className="modal-content">
          <button onClick={() => setIsModalVisible(false)}>&times;</button>

          <h2>Shopping Cart </h2>
          {cartQuantity > 0 && (
            <>
              {cartItems.map((item, index) => (
                <React.Fragment key={item?.id}>
                <CartItem
                  price={item?.price}
                  parent={item?.parent}
                  _id={item?._id}
                  name={item?.name}
                  img={item?.img}
                  id={item?.id}
                  quantity={item?.quantity}
                />
                <hr />
              </React.Fragment>
              ))}
            </>
          )}
          {cartQuantity === 0 && (
            <>
              <p>No Products Added👽</p>
            </>
          )}
          <div className="total">
            Total Items :{cartQuantity}
            <hr />
            Total :{" "}
            {currencyFormatter(
              cartItems.reduce((total, cartItem) => {
                const item = storeProducts.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem?.quantity;
              }, 0)
            )}
          </div>
          <Checkout total={total}/>
        </div>
      </div>
    </>
  );
}
