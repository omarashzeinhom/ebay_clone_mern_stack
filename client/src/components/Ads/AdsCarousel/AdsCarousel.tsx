import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "./AdsCarousel.scss";
import { categoriesService } from "../../../services/categoryService";
import { Category } from "../../../models/category";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading"; 

const AdsCarousel: React.FC = () => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
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

  const shuffleArray = (array: Category[]): Category[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledData = shuffleArray([...categoryData]);
  const handleCategoryClick = useCallback(
    (categoryName: string) => {
      navigate(`/category/${encodeURIComponent(categoryName)}`);
    },
    [navigate]
  );

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
          modules={[Autoplay, Navigation]}
          className="ads-swiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={shuffledData.length > 0} // Enable loop only if there are enough slides
        >
          {shuffledData.map((category) => (
            <SwiperSlide key={category?.name} lazy={true} >
              <div className="ads-swiper__slide">
                <img
                  src={category?.img}
                  alt={category?.name}
                  width={100}
                  height={100}
                  loading="lazy"
                  className="ads-swiper__image"
                />
                <div className="ads-swiper__slide-container">
                  <div className="ads-swiper__image-buttons">
                    <button
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
          <div className="ads-swiper__button-next"></div>
          <div className="ads-swiper__button-prev"></div>
        </Swiper>
      )}
    </div>
  );
};

export default AdsCarousel;

