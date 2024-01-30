import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useShoppingCart } from '../../../context/ShoppingCartContext';
import { currencyFormatter } from '../../../utilities/currencyFormatter';
import { useProductContext } from '../../../context/ProductContext';
import { Product } from '../../../models/product';
import { useAuth } from '../../../context/AuthContext';

export type CheckoutProps = {
  total: number; // Add total as a prop
};

const Checkout: React.FC<CheckoutProps> = ({ total }) => {
  const { token, user,  business,} = useAuth();

  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, clearCart } = useShoppingCart();
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { products } = useProductContext();
  const storeProducts: Product[] = products;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
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
        console.log('Payment successful! Token:', token);
        alert(`Payment successfull ${JSON.stringify(token)}`);
        // Handle the token on your server (send it to your backend API for payment processing)
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

     {(token || user || business) && (
      <>
       <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Card details
          <CardElement />
        </label>
        <h3>Demo Credentials</h3>
        <small>Test with card number 4242 4242 4242 4242</small>
        <small>Expiration Date: 12/34</small>
        <small>CVC:123</small>

        {paymentError && <div className="error">{paymentError}</div>}
        <button type="submit" disabled={!stripe}>
          Pay  {currencyFormatter(
              cartItems.reduce((total, cartItem) => {
                const item = storeProducts.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem?.quantity;
              }, 0)
            )}
        </button>
      </form>
      
      </>
     )

     }

<h3>Please Login To CheckOut</h3>
<small></small>

    </div>
  );
};

export default Checkout;
