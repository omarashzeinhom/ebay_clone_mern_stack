import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "./AdsCarousel.scss";
import { categoriesService } from "../../services/categoryService";
import { useState, useEffect } from "react";
import { Category } from "../../models/category";

const AdsCarousel: React.FC = () => {
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
  return (
    <>
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {categoryData.map((category) => (
          <SwiperSlide key={category?.name}>
            <div className="slide-container">
              <img
                src={category?.img}
                alt={category?.name}
                width={50}
                height={50}
                loading="lazy"
                className="carousel-image"
              />
              <div className="image-buttons">
                <button className="generate-text-button">
                  {category?.name}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </>
  );
};

export default AdsCarousel;
