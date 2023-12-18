// TrendingProductsAlpha.tsx

import React, { useEffect } from "react";
import "swiper/swiper-bundle.css";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useProductContext } from "../../../context/ProductContext";
import "./TrendingProducts.scss";

interface TrendingProductsProps {}

const TrendingProducts: React.FC<TrendingProductsProps> = () => {
  const { products, fetchProducts } = useProductContext();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const filteredProducts = products.filter(
    (product) => product?.parent === "Video Games & Consoles"
  );

  return (
    <div className="app-trending-products-alpha__carousel" id="deals">
      <h2>Today deals on consoles</h2>
      <Swiper
        slidesPerView={3}
        modules={[Scrollbar, Navigation]}
        scrollbar={{
          hide: true,
        }}
        loop={products.length > 2} // Enable loop only if there are enough slides
        spaceBetween={10}
        breakpoints={{
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {filteredProducts.map((product, index) => {
          const productLink = `https://ebayclonemern.netlify.app/item/${product?._id}`;
          return (
            <SwiperSlide
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
                    {product?.name.slice(0,10)}
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
    </div>
  );
};

export default TrendingProducts;
