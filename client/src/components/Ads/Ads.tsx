import React, { useMemo, useEffect } from "react";
import "./Ads.scss";
import { AdItems } from "../../utilities/constants";

const Ads: React.FC = () => {
  useEffect(() => {
    // Preload images
    AdItems.forEach((item) => {
      const img = new Image();
      img.src = item.imageUrl;
    });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const adItems = useMemo(
    () =>
      AdItems.map((item) => (
        <div
          key={item?.id}
          className={`ads__featured__item ads__${item?.category}-item`}
        >
          <a href={item?.link}>
            <img
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
            <button
              aria-label="Shop Button"
              className="ads__featured__item__button"
              id={`Shop Now For ${item?.title}`}
            >
              Shop Now
            </button>
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
