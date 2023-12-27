import App from "./app/App";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "./features/stripe"; // Adjust the path
import { useShoppingCart } from "./context/ShoppingCartContext";
import { ProductProvider, useProductContext } from "./context/ProductContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const AppWrapper = () => {
  const { products } = useProductContext();
  const storeProducts = products || []; // Ensure storeProducts is an array

  const { cartItems } = useShoppingCart();

  // Check if cartItems is defined
  if (!cartItems) {
    // Handle the case where cartItems is undefined
    return (
      <Elements stripe={stripePromise}>
        <App total={0}/>
      </Elements>
    );
  }

  // Calculate the dynamic total based on the shopping cart
  const dynamicTotal = cartItems.reduce((total, cartItem) => {
    const item = storeProducts.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * (cartItem?.quantity || 0);
  }, 0);
  console.log(`Dyanmic total is`,dynamicTotal)

  return (
    <Elements stripe={stripePromise}>
      <App total={dynamicTotal}  />
    </Elements>
  );
};

// Wrap the entire application with ProductProvider
root.render(
  <ProductProvider>
    <AppWrapper />
  </ProductProvider>
);

reportWebVitals();
