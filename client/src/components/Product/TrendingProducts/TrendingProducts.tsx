// CategoriesCarousel.tsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./TrendingProducts.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Scrollbar } from "swiper/modules";

interface TrendingProductsProps {}
interface Image {
  id: number;
  imageUrl: string;
  alt: string;
  buttonText: string;
}

const TrendingProducts: React.FC<TrendingProductsProps> = () => {
  const [images, setImages] = useState<Image[]>([]);

  const fetchRandomImages = async () => {
    try {
      const response = await axios.get(
        "https://api.pexels.com/v1/search?query=christmas&size=small&orientation=landscape",
        {
          headers: {
            Authorization:
              "N9wgadcmAj2BqNR2TD6PWN8YMJvuqgSH9U339yI1uoM9QQhmJPhPDyBX",
          },
        }
      );

      const texts = [
        "Product A",
        "Amazing Deals",
        "Limited Time Offer",
        "Shop Now",
      ];

      const randomImages = response.data.photos.map(
        (photo: any, index: number) => ({
          id: photo.id,
          imageUrl: photo.src.large,
          alt: photo.url,
          buttonText: texts[index % texts.length],
        })
      );

      return randomImages;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  useEffect(() => {
    const getImages = async () => {
      const randomImages = await fetchRandomImages();
      setImages(randomImages);
    };

    getImages();
  }, []);

  return (
    <div>
      <h2>Holiday essentials</h2>
      <Swiper
        slidesPerView={4}
        modules={[Scrollbar]}
        scrollbar={{
          hide: false,
        }}
        spaceBetween={30}
        className="myCustomSwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="category-slide">
              <img src={image?.imageUrl} alt={image.alt} loading="lazy" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingProducts;