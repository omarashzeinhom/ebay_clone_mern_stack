import "./ShoppingCart.scss";
import { useState } from "react";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import CartItem from "../CartItem/CartItem";
import { currencyFormatter } from "../../../utilities/currencyFormatter";
import { useProductContext } from "../../../context/ProductContext";
import { Product } from "../../../models/product";
import Checkout from "../CheckOut/CheckOut";
import React from "react";

type ShoppingCartProps = {
  total: number; 
};

export default function ShoppingCart({ total }: ShoppingCartProps) {
  const { cartItems, cartQuantity,clearCart } = useShoppingCart();
  const { products } = useProductContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const storeProducts: Product[] = products;


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
         onClick={() => setIsModalVisible(false)}>&times;
         </button>

          <h2>Shopping Cart </h2>
          {cartQuantity > 0 && (
            <>
              {cartItems.map((item, index) => (
                <React.Fragment key={item?.id + index}>
                  <CartItem
                    price={item?.price}
                    parent={item?.parent}
                    _id={item?._id}
                    name={item?.name}
                    img={item?.img}
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
            Total Items :{cartQuantity}
             
            Total :{" "}
            {currencyFormatter(
              cartItems.reduce((total, cartItem) => {
                const item = storeProducts.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem?.quantity;
              }, 0)
            )}
          </div>
          <Checkout total={total} />
        </div>
      </div>
    </>
  );
}
