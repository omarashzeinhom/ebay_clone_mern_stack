// Ads.tsx

import React, { useMemo } from "react";
import "./Ads.scss";

const Ads: React.FC = () => {
  const adItems = useMemo(
    () =>
      items.map((item) => (
        <div
          key={item?.id}
          className={`ads__featured__item ads__${item?.category}-item`}
        >
          <a href={item?.link}>
            <img
              rel="preload"
              className="ads__featured__item__img"
              src={item?.imageUrl}
              alt={item?.title}
              width={800}
              height={400}
              loading="lazy"
            />
            <h3 className="ads__featured__item__title">{item?.title}</h3>
            <p className="ads__featured__item__description">
              {item?.description}
            </p>
           <button aria-label="Shop Button"  className="ads__featured__item__button" id="ShopBtn" >Shop Now</button>
          </a>
        </div>
      )),
    []
  );
  return (
    <div className="ads">
      <div className="ads__featured">
        <h2 className="ads__featured__title">Featured</h2>
        {adItems}
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
    link: "/category/Video Games & Consoles",
  },
  {
    id: 2,
    category: "holiday-gifts",
    title: "Up to 60% off holiday gifts",
    description: "Shop candles, cookware, décor, and more. Take a look →",
    imageUrl: "https://source.unsplash.com/800x400/?holiday,gifts",
    link: "/category/Video Games & Consoles",
  },
  {
    id: 3,
    category: "adidas",
    title: "Unwrap holiday savings on adidas",
    description:
      "Save an additional 50% on gift-worthy faves with code ADI5OSALE. Shop now →",
    imageUrl: "https://source.unsplash.com/800x400/?adidas",
    link: "/category/Collectible Sneakers",
  },
  {
    id: 4,
    category: "tire-installation",
    title: "Get local tire installation",
    description:
      "Have your new set installed by our network of experts. Shop top brands →",
    imageUrl: "https://source.unsplash.com/800x400/?tire,installation",
    link: "/category/Parts & accessories",
  },
];
