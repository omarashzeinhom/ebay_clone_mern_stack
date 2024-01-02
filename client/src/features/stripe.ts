import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY || ""
).catch((error) => {
  console.error("Error loading Stripe:", error);
  throw error; // Rethrow the error to propagate it to the application
});

export default stripePromise;
