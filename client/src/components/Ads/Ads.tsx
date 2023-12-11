// Ads.tsx

import React from "react";
import "./Ads.scss";

const Ads: React.FC = () => {
  return (
    <div className="ads">
      <div className="featured">
        <h2>Featured</h2>

        <div className="item ebay-item">
          <img
            src="https://source.unsplash.com/800x400/?ebay"
            alt="eBay Deals"
          />
          <h3>ebay Deals made easy all year long</h3>
          <p>Free shipping. Best prices. Get your thing →→</p>
          <button className="button">Shop Now</button>
        </div>

        <div className="item holiday-gifts-item">
          <img
            src="https://source.unsplash.com/800x400/?holiday,gifts"
            alt="Holiday Gifts"
          />
          <h3>Up to 60% off holiday gifts</h3>
          <p>Shop candles, cookware, décor, and more. Take a look →</p>
          <button className="button">Discover</button>
        </div>

        <div className="item adidas-item">
          <img
            src="https://source.unsplash.com/800x400/?adidas"
            alt="Adidas Savings"
          />
          <h3>Unwrap holiday savings on adidas</h3>
          <p>
            Save an additional 50% on gift-worthy faves with code ADI5OSALE Shop
            now →
          </p>
          <button className="button">Shop Adidas</button>
        </div>

        <div className="item tire-installation-item">
          <img
            src="https://source.unsplash.com/800x400/?tire,installation"
            alt="Tire Installation"
          />
          <h3>Get local tire installation</h3>
          <p>
            Have your new set installed by our network of experts. Shop top
            brands →
          </p>
          <button className="button">Shop Tires</button>
        </div>
      </div>
    </div>
  );
};

export default Ads;
