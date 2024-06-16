import React, { useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../models/category";
import { Scrollbar, Navigation } from "swiper/modules";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { fetchCategories } from "../../../store/categorySlice";
import Loading from "../../Loading/Loading";
import "./CategoriesCarousel.scss";

interface CategoriesCarouselProps {
  selectedCategory?: string;
  handleCategoryClick?: (categoryName: string) => void;
}

const CategoriesCarousel: React.FC<CategoriesCarouselProps> = ({
  selectedCategory,
  handleCategoryClick,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: categoryData, loading } = useSelector((state: RootState) => state.categories);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryData.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoryData.length]);

  const shuffleArray = (array: Category[]): Category[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledData = shuffleArray([...categoryData]);

  // Use handleCategoryClick from props if provided
  const onCategoryClick = (categoryName: string) => {
    if (handleCategoryClick) {
      handleCategoryClick(categoryName);
    } else {
      navigate(`/category/${encodeURIComponent(categoryName)}`);
    }
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
                key={category?.name + index}
                onClick={() => onCategoryClick(category?.name)}
              >
                <div className="app__categories-slide">
                  <img
                    className="app__categories-image"
                    src={category?.img || 'default-fallback-image-url'}
                    alt={category?.name}
                    loading="lazy"
                  />
                  <p className="app__categories-category-name">
                    {category?.name}
                  </p>
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
