import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../models/category";
import { Scrollbar, Navigation } from "swiper/modules";
import { categoriesService } from "../../../services/categoryService";
import "./CategoriesCarousel.scss";
import Loading from "../../Loading/Loading";

interface CategoriesCarouselProps {
  selectedCategory? : string;
  handleCategoryClick?: (categoryName: string)=> void;
}

const CategoriesCarousel: React.FC<CategoriesCarouselProps> = () => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if category data is already available in the state
        if (categoryData.length === 0) {
          const data = await categoriesService.getAllCategories();
          setCategoryData(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryData]); // Only re-run the effect when categoryData changes

  const shuffleArray = (array: Category[]): Category[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledData = shuffleArray([...categoryData]);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="app__categories-carousel">
      {loading ? (
        <Loading text="Fetching Categories..." />
      ) : (
        <>
          <h2>Shop By Category</h2>
          <Swiper
            lazyPreloadPrevNext={1}
            lazyPreloaderClass="swiper-lazy swiper-lazy-loading swiper-lazy-loaded swiper-lazy-preloader"
            navigation={{
              nextEl: ".ads-swiper__button-next",
              prevEl: ".ads-swiper__button-prev",
            }}
            modules={[Scrollbar, Navigation]}
            scrollbar={{
              hide: true,
            }}
            loop={shuffledData.length > 2}
            slidesPerView={3}
            spaceBetween={10}
            breakpoints={{
              768: {
                slidesPerView: 5,
                loop: shuffledData.length > 3,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
          >
            {shuffledData.map((category, index) => (
              <SwiperSlide
                lazy={true}
                key={category?.name}
                onClick={() => handleCategoryClick(category?.name)}
              >
                <div className="app__categories-slide">
                    <img
              rel="preload" 
              src={category?.img} 
              alt={category?.name} 
              width={"100%"}
              height={"100"}
              loading="lazy" />
                  <p className="app__categories-category-name">{category?.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default CategoriesCarousel;
