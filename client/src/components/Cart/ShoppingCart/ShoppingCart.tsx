import "./ShoppingCart.scss";
import CartItem from "../CartItem/CartItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductContext";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { currencyFormatter } from "../../../utilities/currencyFormatter";

type ShoppingCartProps = {
  isOpen: boolean;
};

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, cartQuantity } = useShoppingCart();
  const { fetchProducts,products,getProductById,  } = useProductContext();
  const {increaseCartQuantity, decreaseCartQuantity, removefromCart , getItemQuantity} = useShoppingCart();
  const { productId } = useParams();
  const [product, setProduct] = useState<any | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const productData = await getProductById(productId);
        setProduct(productData);
      }
    };

    fetchData();
  }, [productId, getProductById]);

  useEffect(()=>{
  fetchProducts();
  getProductById(productId || "");

    console.log(products);
  },[])



  const storeProducts: any[] = products; // Get All Store Products here

  return (
    <>
      {cartQuantity > 0 && (
        <>
          {cartQuantity}
          {cartItems.map((item, index) => {
            <CartItem price={0} parent={""} _id={""} name={""} img={""} key={item?.id} {...item} />;
            <button onClick={()=> removefromCart(item?.id)}> Remove</button>

          })}
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

      <div>

      </div>
    </>
  );
}
