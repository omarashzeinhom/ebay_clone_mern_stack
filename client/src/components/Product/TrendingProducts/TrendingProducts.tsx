import React, { useEffect, useState } from "react";
import "swiper/swiper-bundle.css";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useProductContext } from "../../../context/ProductContext";
import "./TrendingProducts.scss";
import { HOME_URL } from "../../../utilities/constants";
import Loading from "../../Loading/Loading";

const TrendingProducts: React.FC = () => {
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
    (product) => product?.category === "Video Games & Consoles"
  );

  return (
    <div className="app-trending-products-alpha__carousel" id="deals">
      <h2>Todays deals on consoles</h2>
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
        modules={[Scrollbar, Navigation]}
        scrollbar={{
          hide: true,
        }}
        loop={filteredProducts.length > 2}
        slidesPerView={3}
        spaceBetween={100}
        breakpoints={{
          768: {
            slidesPerView: 5,
            loop: filteredProducts .length > 3,
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
                      {product?.name.slice(0, 10)}
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
    </div>
  );
};

export default TrendingProducts;
