import App from "./app/App";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './features/stripe'; // Adjust the path

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const total = 10



root.render(<Elements stripe={stripePromise}>
  <App total={10}/>
</Elements>);

reportWebVitals();
