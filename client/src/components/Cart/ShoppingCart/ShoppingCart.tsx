import "./ShoppingCart.scss";
import  { useEffect, useState  } from "react";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import CartItem from "../CartItem/CartItem";
import { currencyFormatter } from "../../../utilities/currencyFormatter";
import { useProductContext } from "../../../context/ProductContext";
import { useParams } from "react-router-dom";

type ShoppingCartProps = {
  isOpen: boolean;
};

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, cartQuantity } = useShoppingCart();
  const { fetchProducts, products, getProductById } = useProductContext();
  const { productId } = useParams();
  const [product, setProduct] = useState<any | null>(null);

  console.log(closeCart , product);

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const productData = await getProductById(productId);
        setProduct(productData);
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
      {cartQuantity > 0 && (
        <>
          {cartQuantity}
          {cartItems.map((item, index) => 
           (
              <>
                <CartItem
                  price={item?.price}
                  parent={item?.parent}
                  _id={item?._id}
                  name={item?.name}
                  img={item?.img}
                  key={item?.id}
                  id={item?.id}
                  quantity={item?.quantity}
                />
              
              </>
            ))}
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
    </>
  );
}
