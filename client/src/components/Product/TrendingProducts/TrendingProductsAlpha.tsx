// TrendingProductsAlpha.tsx
import React, { useEffect, useState } from "react";
import "swiper/swiper-bundle.css";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useProductContext } from "../../../context/ProductContext";
import "./TrendingProductsAlpha.scss";
import { HOME_URL } from "../../../utilities/constants";
import Loading from "../../Loading/Loading"; 

interface TrendingProductsAlphaProps {}

const TrendingProductsAlpha: React.FC<TrendingProductsAlphaProps> = () => {
  const { products, fetchProducts } = useProductContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const filteredProducts = products.filter(
    (product) => product?.category === "Collectible Sneakers"
  );

  return (
    <section id="dailydeals" className="app-trending-products-alpha__carousel">
      <h2>Score These Trending Kicks</h2>
      {loading ? (
        <Loading text="Fetching Trending Products..." />
      ) : (
        <Swiper
        lazyPreloadPrevNext={1}
        lazyPreloaderClass="swiper-lazy swiper-lazy-loading swiper-lazy-loaded swiper-lazy-preloader"
        navigation={{
          nextEl: ".ads-swiper__button-next",
          prevEl: ".ads-swiper__button-prev",
        }}
        slidesPerView={3}
        modules={[Scrollbar, Navigation]}
        scrollbar={{
          hide: true,
        }}
        loop={products.length > 2} // Enable loop only if there are enough slides
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
        {filteredProducts.map((product, index) => {
          const productLink = `${HOME_URL}item/${product?._id}`;
          return (
            <SwiperSlide
              lazy={true}
              key={index}
              className="app-trending-products-alpha__carousel__slide"
            >
              <div className="category-slide">
                <a href={productLink}>
                  <img
                    src={product?.img}
                    alt={product?.name}
                    loading="lazy"
                    className="app-trending-products-alpha__carousel__slide__img"
                  />
                  <small className="app-trending-products-alpha__carousel__slide__name">
                    {product?.name}
                  </small>
                  <br />
                  <small className="app-trending-products-alpha__carousel__slide__price">
                    Price:{product?.price} $
                  </small>
                </a>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      )}
    </section>
  );
};

export default TrendingProductsAlpha;
