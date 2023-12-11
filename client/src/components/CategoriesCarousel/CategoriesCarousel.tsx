// CategoriesCarousel.tsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import "./CategoriesCarousel.scss";
import { Category } from "../../models/category";
import { Scrollbar, Navigation } from "swiper/modules";
import { categoriesService } from "../../services/categoryService";

interface CategoriesCarouselProps {}

const CategoriesCarousel: React.FC<CategoriesCarouselProps> = () => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesService.getAllCategories();
        setCategoryData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const shuffleArray = (array: Category[]): Category[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledData = shuffleArray([...categoryData]);

  return (
    <div className="app__categories-Carousel">
      <h2>Shop By Category</h2>
      <Swiper
        modules={[Scrollbar, Navigation]}
        scrollbar={{
          hide: true,
        }}
        loop={true}
        slidesPerView={3}
        spaceBetween={10}
        breakpoints={{
          
          768: {
            slidesPerView: 5, 
           
          },
          1024: {
            slidesPerView: 6,
          },
        }}
      >
        {shuffledData.map((category, index) => (
          <SwiperSlide key={index}>
            <Link to={`/category/${encodeURIComponent(category.name)}`}>
              <div className="swiper-slide">
                <img src={category.img} alt={category.name} loading="lazy" />
                <p className="category-name">{category.name.slice(0, 15)}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesCarousel;
