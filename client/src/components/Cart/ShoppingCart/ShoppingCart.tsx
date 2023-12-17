import React, { useState } from "react";
import "./ShoppingCart.scss";
import { useEffect } from "react";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import CartItem from "../CartItem/CartItem";
import { currencyFormatter } from "../../../utilities/currencyFormatter";
import { useProductContext } from "../../../context/ProductContext";
import { useParams } from "react-router-dom";
import { TbShoppingCart } from "react-icons/tb";

type ShoppingCartProps = {
  isOpen: boolean;
};

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
  let { closeCart, cartItems, cartQuantity } = useShoppingCart();
  const { fetchProducts, products, getProductById } = useProductContext();
  const { productId } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const productData = await getProductById(productId);
        setProduct(productData);
        console.log(`productData ---> ${productData}`);
      }
    };

    fetchData();
  }, [productId, getProductById]);

  useEffect(() => {
    fetchProducts();
    getProductById(productId || "");
  }, []);

  const storeProducts: any[] = products; // Get All Store Products here

  return (
    <>
      <span onClick={() => setIsModalVisible(true)}>
        {cartQuantity}

        <TbShoppingCart className="app__nav-rightIcon" />
      </span>

      {/* Modal */}
      <div className={`modal ${isModalVisible ? "visible" : ""}`}>
        <div className="modal-content">
          <h2>Modal Content</h2>
          {cartQuantity > 0 && (
            <>
              {cartQuantity}

              <>
                {cartItems.map((item, index) => (
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

          <div className="">
            Total :{" "}
            {currencyFormatter(
              cartItems.reduce((total, cartItem) => {
                const item = storeProducts.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem?.quantity;
              }, 0)
            )}
          </div>
          {/* Add your modal content here */}
          <button onClick={() => setIsModalVisible(false)}>&times;</button>
        </div>
      </div>
    </>
  );
}
