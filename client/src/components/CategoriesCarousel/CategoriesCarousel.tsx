// CategoriesCarousel.tsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './CategoriesCarousel.css';
import { Category, categoryData } from '../../utils/searchBarConstants';

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
      <h2>Add Categories Carousel Here 📝</h2>
      <Swiper slidesPerView={4} spaceBetween={30} className="myCustomSwiper">
        {shuffledData.map((category, index) => (
          <SwiperSlide key={index}>
            <div className="category-slide">
              <img src={category.img} alt={category.name} loading="lazy" />
              <p>{category.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesCarousel;
