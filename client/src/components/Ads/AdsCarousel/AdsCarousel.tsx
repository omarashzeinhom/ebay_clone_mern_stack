import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./AdsCarousel.scss";
import { categoriesService } from "../../../services/categoryService";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { unsplashApi } from "../../../features/unsplashConfig";


const AdsCarousel: React.FC = () => {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoriesService.getAllCategories();
        setCategoryData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="ads-swiper-container">
      {loading ? (
        <Loading text="Fetching Ads..." />
      ) : (
        <Swiper
          lazyPreloadPrevNext={1}
          lazyPreloaderClass="swiper-lazy swiper-lazy-loading swiper-lazy-loaded swiper-lazy-preloader"
          navigation={{
            nextEl: ".ads-swiper__button-next",
            prevEl: ".ads-swiper__button-prev",
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className="ads-swiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={categoryData.length > 0} // Enable loop only if there are enough slides
        >
          {categoryData.map((category) => (
            <SwiperSlide key={category.name} lazy={true}>
              <div className="ads-swiper__slide">
                <img
                  src={category?.img}
                  alt={category?.name}
                  width={100}
                  height={100}
                  loading="lazy"
                  onClick={() => handleCategoryClick(category?.name)}
                  className="ads-swiper__image"
                />
                <div className="ads-swiper__slide-container">
                  <div className="ads-swiper__image-buttons">
                    <button
                      aria-label="NextImageButton"
                      className="ads-swiper__generate-text-button"
                      onClick={() => handleCategoryClick(category?.name)}
                    >
                      {category?.name}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="ads-swiper__button-next" aria-label="NextImageButton"></div>
          <div className="ads-swiper__button-prev" aria-label="PreviousImageButton"></div>
        </Swiper>
      )}
    </div>
  );
};

export default AdsCarousel;
