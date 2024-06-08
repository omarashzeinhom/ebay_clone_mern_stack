import React, { useMemo, useEffect, useState } from "react";
import "./Ads.scss";
import { AdItems } from "../../utilities/constants";
import { createApi } from "unsplash-js";

// Unsplash API client
const unsplashApi = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_API_AK || ''
});

const Ads: React.FC = () => {
  const [unsplashImages, setUnsplashImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const preloadImages = () => {
      AdItems.forEach((item) => {
        const img = new Image();
        img.src = item.imageUrl;
      });
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const fetchUnsplashImages = async () => {
      const imagePromises = AdItems.map(async (item) => {
        try {
          const result = await unsplashApi.search.getPhotos({
            query: item.title || item.category,
            orientation: "landscape",
            perPage: 1,
          });

          if (result.response?.results[0]) {
            return { [item.id]: result.response.results[0].urls.small };
          }
        } catch (error) {
          console.error(`Error fetching Unsplash image for ${item.title || item.category}:`, error);
        }
        return { [item.id]: "" };
      });

      const images = await Promise.all(imagePromises);
      const imagesMap = images.reduce((acc, cur) => ({ ...acc, ...cur }), {});
      setUnsplashImages(imagesMap);
    };

    fetchUnsplashImages();
  }, []);

  const AdCarouselItems = useMemo(
    () =>
      AdItems.map((item) => (
        <div
          key={item?.id}
          className={`ads__featured__item ads__${item?.category}-item`}
        >
          <a href={item?.link}>
            <img
              className="ads__featured__item__img"
              src={unsplashImages[item.id] || item.imageUrl}
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
    [unsplashImages]
  );

  return (
    <div className="ads">
      <div className="ads__featured">
        <h2 className="ads__featured__title">Featured</h2>
        {AdCarouselItems}
      </div>
    </div>
  );
};

export default Ads;
