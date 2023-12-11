// CategoriesCarousel.tsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./CategoriesCarousel.css";
import { Category, categoryData } from "../../utils/searchBarConstants";
import { Scrollbar } from "swiper/modules";

interface CategoriesCarouselProps {
  // Add any props if needed
}

const CategoriesCarousel: React.FC<CategoriesCarouselProps> = () => {
  const shuffleArray = (array: Category[]): Category[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledData = shuffleArray([...categoryData]);

  return (
    <div>
      <h2>Shop By Category</h2>
      <Swiper
        modules={[Scrollbar]}
        scrollbar={{
          hide: false,
        }}
        slidesPerView={4}
        spaceBetween={30}
        className="myCustomSwiper"
      >
        {shuffledData.map((category, index) => (
          <SwiperSlide key={index}>
            <div className="category-slide">
              <img src={category.img} alt={category.name} loading="lazy" />
              <p className="category-name">{category.name.slice(0, 10)}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesCarousel;
