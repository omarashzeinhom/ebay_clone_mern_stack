import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./TrendingProductsAlpha.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Scrollbar } from "swiper/modules";
import { useProductContext } from "../../../context/ProductContext";

interface TrendingProductsAlphaProps {
  // Add any props if needed
}

const TrendingProductsAlpha: React.FC<TrendingProductsAlphaProps> = () => {
  const { products, fetchProducts } = useProductContext();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);
  //DEBUG console.log(categoryName);

  const filteredProducts = "Collectible Sneakers"
    ? products.filter((product) => product?.parent === "Collectible Sneakers")
    : products.filter((product) => "Collectible Sneakers" === product?.parent);

  return (
    <div>
      <h2>Score these trending Kicks</h2>
      <Swiper
        slidesPerView={4}
        modules={[Scrollbar]}
        scrollbar={{
          hide: false,
        }}
        spaceBetween={30}
        className="myCustomSwiper"
      >
        {filteredProducts.map((product, index) => {
          const productLink = `http://localhost:3000/item/${product?._id}`;
          return (
            <SwiperSlide key={index}>
              <div className="category-slide">
                <a href={productLink}>
                  <img src={product?.img} alt={product?.name} loading="lazy" />
                </a>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TrendingProductsAlpha;
