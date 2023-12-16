// CategoriesCarousel.tsx

import "./Deals.scss";
import React from "react";
import axios from "axios";
import "swiper/swiper-bundle.css";
import { Scrollbar } from "swiper/modules";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

interface DealsProps {
  // Add any props if needed
}
interface Image {
  id: number;
  imageUrl: string;
  alt: string;
  buttonText: string;
}

const Deals: React.FC<DealsProps> = () => {
  const [images, setImages] = useState<Image[]>([]);

  const fetchRandomImages = async () => {
    try {
      const response = await axios.get(
        "https://api.pexels.com/v1/search?query=mobiles&size=small&orientation=landscape",
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
    <section id="dailydeals">
      <h2>Today's Deals – All With Free Shipping</h2>
      <Swiper
        modules={[Scrollbar]}
        scrollbar={{
          hide: false,
        }}
        slidesPerView={4}
        spaceBetween={30}
        className="myCustomSwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="category-slide">
              <img src={image.imageUrl} alt={image.alt} loading="lazy" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Deals;
