import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../../features/stripe';
import Checkout, { CheckoutProps } from './CheckOut';


export const CheckoutWrapper: React.FC<CheckoutProps> = ({ total }) => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout total={total} />
    </Elements>
  );
};
