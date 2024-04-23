// CartItem.tsx
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { currencyFormatter } from "../../../utilities/currencyFormatter";
import { CartItemProps } from "../../../models/cartitem";

const CartItem: React.FC<CartItemProps> = ({
  id,
  quantity,
  price,
  img,
  name,
}) => {
  const { removefromCart, decreaseCartQuantity, increaseCartQuantity } =
    useShoppingCart();

  // console.log("Cart Item render", id, _id, quantity, price, img, name, parent);

  return (
    <>
      {quantity > 0 && (
        <div>
          <div key={id} className="d-flex align-items-center">
              <img
               
              src={img}
              alt={name}
              loading="lazy"
              style={{ width: "45px", height: "45px", borderRadius: "50%" }}
            />
            <div >
              <p >{name}</p>
              <p >{currencyFormatter(price || 0)}</p>
            </div>
          </div>
          <p>Quantity:{quantity}</p>
         <button aria-label="IncreaseItemQuantity"
            onClick={() => increaseCartQuantity(id)}
            style={{ backgroundColor: "green", color: "white" }}
          >
            +
          </button>
         <button aria-label="DecreaseItemQuantity"
            onClick={() => decreaseCartQuantity(id)}
            style={{ backgroundColor: "red", color: "white" }}
          >
            -
          </button>
         <button aria-label="RemoveItemFromCart"
            onClick={() => removefromCart(id)}
            style={{ backgroundColor: "yellow", color: "black" }}
          >
            &times;{" "}
          </button>
        </div>
      )}
    </>
  );
};

export default CartItem;
