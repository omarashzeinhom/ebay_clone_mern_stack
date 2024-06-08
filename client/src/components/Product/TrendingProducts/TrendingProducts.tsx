import React, { useEffect, useState } from "react";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useProductContext } from "../../../context/ProductContext";
import "./TrendingProducts.scss";
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { createApi } from 'unsplash-js';

// Unsplash API client
const unsplashApi = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_API_AK || ''
});

const TrendingProducts: React.FC = () => {
  const { products, fetchProducts } = useProductContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [productImages, setProductImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts();
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const filteredProducts = products.filter(
        (product) => product?.category === "Video Games & Consoles"
      );

      // Fetch images for each product category
      if (filteredProducts.length > 0) {
        const category = filteredProducts[0]?.category || "Video Games";
        try {
          const result = await unsplashApi.search.getPhotos({
            query: category,
            orientation: 'landscape',
            perPage: filteredProducts.length // Get as many images as products
          });

          if (result.response) {
            const images = result.response.results.reduce((acc, photo, index) => {
              const productId = filteredProducts[index]?._id;
              if (productId) {
                acc[productId] = photo.urls.small;
              }
              return acc;
            }, {} as { [key: string]: string });

            setProductImages(images);
          } else {
            console.error("No response from Unsplash");
          }
        } catch (error) {
          console.error("Error fetching images from Unsplash:", error);
        }
      }
    };

    if (products.length > 0) {
      fetchImages();
    }
  }, [products]);

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
            {filteredProducts.map((product, index) => {
              return (
                <SwiperSlide
                  lazy={true}
                  key={product?._id}
                  onClick={() => handleProductClick(product?._id)}
                >
                  <div className="app__trending-products-slide app__trending-products-slide-active">
                    <img
                      width={"100%"}
                      height={"100"}
                      src={productImages[product._id] || 'fallback-image-url'} // Use fetched Unsplash image or fallback
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
              );
            })}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default TrendingProducts;
