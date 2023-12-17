// CartItem.tsx
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { currencyFormatter } from "../../../utilities/currencyFormatter";
import { CartItemProps } from "../../../models/cartitem";

const CartItem: React.FC<CartItemProps> = ({
  id,
  _id,
  quantity,
  price,
  img,
  name,
  parent,
}) => {
  const { removefromCart,  } = useShoppingCart();




  console.log("CartItem render", id, _id, quantity, price, img, name, parent);

  return (
    <>
      {quantity > 0 && (
        <div>
          <div key={id} className="d-flex align-items-center">
            <img
              src={img}
              alt={name}
              style={{ width: "45px", height: "45px", borderRadius: "50%" }}
            />
            <div className="ms-3">
              <p className="">{name}</p>
              <p className="">{currencyFormatter((price || 0))}</p>
            </div>
          </div>
          <button onClick={()=> removefromCart(id)} style={{backgroundColor: "red"}}>&times;</button>
        </div>
      )}
    </>
  );
};

export default CartItem;
