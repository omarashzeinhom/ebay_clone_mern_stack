import React, { useEffect, useState } from "react";
import "swiper/swiper-bundle.css";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import "./TrendingProducts.scss";
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../../store/productSlice";
import { RootState, AppDispatch } from "../../../store/store";

interface TrendingProductsAlphaProps { }

const TrendingProductsAlpha: React.FC<TrendingProductsAlphaProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products, status } = useSelector((state: RootState) => state.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts()).unwrap();
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredProducts = products.filter(
    (product) => product?.category === "Collectible Sneakers"
  );

  const handleProductClick = (productId: string) => {
    navigate(`/item/${encodeURIComponent(productId)}`);
  };

  return (
    <div id="dailydeals" className="app__trending-products-carousel">
      <h2>Score These Trending Kicks</h2>
      {loading || status === "loading" ? (
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
          spaceBetween={10}
          breakpoints={{
            768: {
              slidesPerView: 5,
              loop: filteredProducts.length > 3,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {filteredProducts.map((product) => (
            <SwiperSlide
              key={product?._id}
              onClick={() => handleProductClick(product?._id)}
            >
              <div className="app__trending-products-slide app__trending-products-slide-active">
                <img
                  src={product?.img}
                  alt={product?.name}
                  loading="lazy"
                  width={"100%"}
                  height={"100"}
                />
                <p className="app__trending-products-slide-name">
                  {product?.name.slice(0, 10)}
                </p>
                <p className="app__trending-products-slide-price">
                  Price: {product?.price} $
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default TrendingProductsAlpha;
