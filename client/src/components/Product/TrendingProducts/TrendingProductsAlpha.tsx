import React, { useEffect, useState } from "react";
import "swiper/swiper-bundle.css";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useProductContext } from "../../../context/ProductContext";
import "./TrendingProducts.scss";
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { unsplashApi } from "../../../features/unsplashConfig";


interface TrendingProductsAlphaProps { }

const TrendingProductsAlpha: React.FC<TrendingProductsAlphaProps> = () => {
  const { products, fetchProducts } = useProductContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [productImages, setProductImages] = useState<{ [key: string]: string }>({});

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

  useEffect(() => {
    const fetchImages = async () => {
      const filteredProducts = products.filter(
        (product) => product?.category === "Collectible Sneakers"
      );

      if (filteredProducts.length > 0) {
        const category = filteredProducts[0]?.category || "Sneakers";
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
    (product) => product?.category === "Collectible Sneakers"
  );

  const handleProductClick = (productId: string) => {
    navigate(`/item/${encodeURIComponent(productId)}`);
  };

  return (
    <div id="dailydeals" className="app__trending-products-carousel">
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
            const imageUrl = productImages[product._id] || product.img || 'fallback-image-url';
            return (
              <SwiperSlide
                lazy={true}
                key={product?._id}
                onClick={() => handleProductClick(product?._id)}
              >
                <div className="app__trending-products-slide app__trending-products-slide-active">
                  <img
                    src={imageUrl}
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
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default TrendingProductsAlpha;
