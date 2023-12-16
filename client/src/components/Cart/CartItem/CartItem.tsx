// CartItem.tsx
import React from "react";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { currencyFormatter } from "../../../utilities/currencyFormatter";

type CartItemProps = {
  _id: string;
  id: number; 
  quantity: number;
  name: string;
  img: string;
  price: number;
  parent: string;
};

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
      <div key={_id} className="d-flex align-items-center">
        <span>{id}</span>
<p>{parent}</p>
        <img
          src={img}
          alt={name}
          style={{ width: "45px", height: "45px" }}
          className="rounded-circle"
        />
        <div className="ms-3">
          <p className="fw-bold mb-1">{name}</p>
          <p className="text-muted mb-0">
            {currencyFormatter((price || 0) * quantity)}
          </p>
        </div>
      </div>
      {quantity > 1 && <div>x{quantity}</div>}
      // Within CartItem component
      <div key={id} className="d-flex align-items-center">
        <img
          src={img}
          alt={name}
          style={{ width: "45px", height: "45px" }}
          className="rounded-circle"
        />
        <div className="ms-3">
          <p className="fw-bold mb-1">{name}</p>
          <p className="text-muted mb-0">
            {currencyFormatter((price || 0) * quantity)}
          </p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
