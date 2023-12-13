// Ads.tsx

import React from "react";
import "./Ads.scss";

const Ads: React.FC = () => {
  return (
    <div className="ads">
    <div className="ads__featured">
      <h2 className="ads__featured__title">Featured</h2>
      {items.map((item) => (
          <div key={item.id} className={`ads__featured__item ads__${item.category}-item`}>
            <img
              className="ads__featured__item__img"
              src={item.imageUrl}
              alt={item.title}
            />
            <h3 className="ads__featured__item__title">{item.title}</h3>
            <p className="ads__featured__item__description">{item.description}</p>
            <button className="ads__featured__item__button">Shop Now</button>
          </div>
        ))}
    </div>
  </div>
  );
};

export default Ads;

const items = [
  {
    id: 1,
    category: "ebay",
    title: "eBay Deals made easy all year long",
    description: "Free shipping. Best prices. Get your thing →→",
    imageUrl: "https://source.unsplash.com/800x400/?ebay",
  },
  {
    id: 2,
    category: "holiday-gifts",
    title: "Up to 60% off holiday gifts",
    description: "Shop candles, cookware, décor, and more. Take a look →",
    imageUrl: "https://source.unsplash.com/800x400/?holiday,gifts",
  },
  {
    id: 3,
    category: "adidas",
    title: "Unwrap holiday savings on adidas",
    description: "Save an additional 50% on gift-worthy faves with code ADI5OSALE. Shop now →",
    imageUrl: "https://source.unsplash.com/800x400/?adidas",
  },
  {
    id: 4,
    category: "tire-installation",
    title: "Get local tire installation",
    description: "Have your new set installed by our network of experts. Shop top brands →",
    imageUrl: "https://source.unsplash.com/800x400/?tire,installation",
  },
];