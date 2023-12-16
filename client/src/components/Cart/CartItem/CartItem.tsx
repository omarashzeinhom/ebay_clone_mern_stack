// CartItem.tsx
import React from "react";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { currencyFormatter } from "../../../utilities/currencyFormatter";

type CartItemProps = {
  id?: number; // Make id optional
  quantity: number;
  _id: string;
  name: string;
  img: string;
  price?: number;
  parent?: string;
};

const CartItem: React.FC<CartItemProps> = ({ _id, quantity, price, img, name }) => {
    const { removefromCart } = useShoppingCart();

  return (
    <>
      <div key={_id} className="d-flex align-items-center">
        <img
          src={img}
          alt={name}
          style={{ width: "45px", height: "45px" }}
          className="rounded-circle"
        />
        <div className="ms-3">
          <p className="fw-bold mb-1">{name}</p>
          <p className="text-muted mb-0">{currencyFormatter((price || 0) * quantity)}</p>
        </div>
      </div>
      {quantity > 1 && <div>x{quantity}</div>}
    
// Within CartItem component
<div key={_id} className="d-flex align-items-center">
  <img
    src={img}
    alt={name}
    style={{ width: "45px", height: "45px" }}
    className="rounded-circle"
  />
  <div className="ms-3">
    <p className="fw-bold mb-1">{name}</p>
    <p className="text-muted mb-0">{currencyFormatter((price || 0) * quantity)}</p>
  </div>
</div>

    </>
  );
};

export default CartItem;

