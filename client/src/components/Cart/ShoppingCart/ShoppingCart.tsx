import "./ShoppingCart.scss";
import { useState } from "react";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import CartItem from "../CartItem/CartItem";
import { currencyFormatter } from "../../../utilities/currencyFormatter";
import { useProductContext } from "../../../context/ProductContext";
import { TbShoppingCart } from "react-icons/tb";

type ShoppingCartProps = {
  isOpen: boolean;
};

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { cartItems, cartQuantity } = useShoppingCart();
  const { products } = useProductContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const storeProducts: any[] = products; // Get All Store Products here

  return (
    <>
      <span onClick={() => setIsModalVisible(true)}>
        {cartQuantity}

        <TbShoppingCart className="app__nav-rightIcon" />
      </span>

      <div className={`modal ${isModalVisible ? "visible" : ""}`}>
        <div className="modal-content">
          <h2>Shopping Cart </h2>
          {cartQuantity > 0 && (
            <>
              {cartQuantity}
              <>
                {cartItems.map((item) => (
                  <CartItem
                    key={item?.id}
                    price={item?.price}
                    parent={item?.parent}
                    _id={item?._id}
                    name={item?.name}
                    img={item?.img}
                    id={item?.id}
                    quantity={item?.quantity}
                  />
                ))}
              </>
            </>
          )}

          <div className="total">
            Total :{" "}
            {currencyFormatter(
              cartItems.reduce((total, cartItem) => {
                const item = storeProducts.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem?.quantity;
              }, 0)
            )}
          </div>
          <button onClick={() => setIsModalVisible(false)}>&times;</button>
        </div>
      </div>
    </>
  );
}