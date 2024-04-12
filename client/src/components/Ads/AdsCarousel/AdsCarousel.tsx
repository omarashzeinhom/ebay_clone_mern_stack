import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "./AdsCarousel.scss";
import { categoriesService } from "../../../services/categoryService";
import { Category } from "../../../models/category";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { useCategoryContext } from "../../../context/CategoryContext";

const AdsCarousel: React.FC = () => {
  const { categoryData, setCategoryData } = useCategoryContext();
  const [loading, setLoading] = useState(true);
  const [shuffledData, setShuffledData] = useState<Category[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if categoryData is already available
        if (categoryData.length === 0) {
          // Fetch categories only if not available
          const data = await categoriesService.getAllCategories();
          setCategoryData(data);
          setShuffledData(shuffleArray([...data]));
        } else {
          // If data is available, use it directly
          setShuffledData(shuffleArray([...categoryData]));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setFetchError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryData, setCategoryData]);

  const shuffleArray = (array: Category[]): Category[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

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
      ) : fetchError ? (
        <div className="error-message">{fetchError}</div>
      ) : (
        <>
          {shuffledData.map((category) => (
            <link
              key={category?.name}
              rel="preload"
              as="image"
              crossOrigin=""
              href={category?.img}
            />
          ))}
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
              <SwiperSlide key={category?.name} lazy={true}>
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
        </>
      )}
    </div>
  );
};

export default AdsCarousel;
