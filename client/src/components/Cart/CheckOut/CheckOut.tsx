import React, { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { useShoppingCart } from '../../../context/ShoppingCartContext';
import { currencyFormatter } from '../../../utilities/currencyFormatter';
import stripePromise from '../../../features/stripe'; // Adjust the path

type CheckoutProps = {
  total: number; // Add total as a prop
};

const Checkout: React.FC<CheckoutProps> = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, cartQuantity, clearCart } = useShoppingCart();
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    try {
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        console.error(error);
        //setPaymentError(error?.message);
      } else {
        // Send the token to your server for processing
        console.log('Payment successful! Token:', token);
        // TODO: Handle the token on your server (e.g., send it to your backend API for payment processing)
        // Once payment is successful, you may want to clear the cart
        clearCart();
      }
    } catch (error) {
      console.error('Error creating token:', error);
      setPaymentError('An error occurred while processing your payment.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Card details
          <CardElement />
        </label>
        {paymentError && <div className="error">{paymentError}</div>}
        <button type="submit" disabled={!stripe}>
          Pay {currencyFormatter(total)}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
