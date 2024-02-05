import App from "./app/App";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Elements, ElementProps } from "@stripe/react-stripe-js";
import stripePromise from "./features/stripe"; // Adjust the path
import { useShoppingCart } from "./context/ShoppingCartContext";
import { ProductProvider, useProductContext } from "./context/ProductContext";
<<<<<<< HEAD
import { /**Profiler, */ useState } from "react";
=======
import {/** Profiler, */ useState, } from "react";
>>>>>>> c5d604496437ba0065ccd5ea1300b354cb0234b8
//import { onRender } from "./utilities/constants";

// root
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

interface ElementsWithOnErrorProps extends ElementProps {
  onError?: (error: any) => void;
}
// AppWrapper
const AppWrapper = () => {
  const { products } = useProductContext();
  const { cartItems } = useShoppingCart();
  const storeProducts = products || [];
  const [stripeError, setStripeError] = useState(null);

  const handleError = (error: any) => {
    console.error("Stripe error:", error);
    // Handle the error as needed
    setStripeError(error);
<<<<<<< HEAD
    console.error(stripeError);
=======
    console.log(stripeError)
>>>>>>> c5d604496437ba0065ccd5ea1300b354cb0234b8
  };

  // Check if cartItems is defined
  if (!cartItems) {
    // Handle the case where cartItems is undefined
    return (
      <Elements
        stripe={stripePromise}
        {...({ onError: handleError } as ElementsWithOnErrorProps)}
      >
        <App total={0} />
      </Elements>
    );
  }

  // Calculate the dynamic total based on the shopping cart
  const dynamicTotal = cartItems.reduce((total, cartItem) => {
    const item = storeProducts.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * (cartItem?.quantity || 0);
  }, 0);
  console.log(`Dyanmic total is`, dynamicTotal);

  return (
    <Elements
      stripe={stripePromise} // Use type assertion to tell TypeScript about the custom prop
      {...({ onError: handleError } as ElementsWithOnErrorProps)}
    >
      <App total={dynamicTotal} />
    </Elements>
  );
};

// Development: Wrap the entire application with Profiler
/**
 * 
<<<<<<< HEAD
 * 
 * const AppWithProfiler = () => (
=======
 *  const AppWithProfiler = () => (
>>>>>>> c5d604496437ba0065ccd5ea1300b354cb0234b8
  <Profiler id="App" onRender={onRender}>
    <ProductProvider>
      <AppWrapper />
    </ProductProvider>
  </Profiler>
);
 */

 */
// Production: Remove Profile in production to avoid excessive costs
const AppWithOutProfiler = () => (
  <ProductProvider>
    <AppWrapper />
  </ProductProvider>
);

// Development: Render the application with the Profiler
// Production: Render the application without the Profiler.

root.render(<AppWithOutProfiler />);

reportWebVitals();
