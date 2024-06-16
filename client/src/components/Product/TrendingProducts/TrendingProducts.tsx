import React, { useEffect, useState } from "react";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import "./TrendingProducts.scss";
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../../store/productSlice";
import { RootState, AppDispatch } from "../../../store/store";

const TrendingProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state: RootState) => state.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts()).unwrap();
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [dispatch]);

  const filteredProducts = products.filter(
    (product) => product?.category === "Video Games & Consoles"
  );

  const handleProductClick = (productId: string) => {
    navigate(`/item/${encodeURIComponent(productId)}`);
  };

  return (
    <div id="deals" className="app__trending-products-carousel">
      {loading ? (
        <Loading text="Fetching Trending Kicks..." />
      ) : (
        <>
          <h2>Todays deals on consoles</h2>
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
                    width={"100%"}
                    height={"100"}
                    src={product?.img}
                    alt={product?.name}
                    loading="lazy"
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
        </>
      )}
    </div>
  );
};

export default TrendingProducts;
