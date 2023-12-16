// CartItem.tsx
import React from "react";
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
  const { removefromCart } = useShoppingCart();

  return (
    <>
      <div key={id} className="d-flex align-items-center">
        <span>{_id}</span>
        <p>{parent}</p>
        <img
          src={img}
          alt={name}
          style={{ width: "45px", height: "45px" }}
          className="rounded-circle"
        />
        <div className="ms-3">
          <p className="">{name}</p>
          <p className="">{currencyFormatter((price || 0) * quantity)}</p>
        </div>
      </div>
      {quantity > 1 && <div>x{quantity}</div>}
      <div key={id} className="">
        <img
          src={img}
          alt={name}
          style={{ width: "45px", height: "45px" }}
          className="rounded-circle"
        />
        <div className="">
          <p className="">{name}</p>
          <p className="">{currencyFormatter((price || 0) * quantity)}</p>
          <button onClick={() => removefromCart(id)}>&times;</button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
