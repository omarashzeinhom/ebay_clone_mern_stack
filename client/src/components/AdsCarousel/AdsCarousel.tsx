import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./AdsCarousel.scss";

interface Image {
  id: number;
  imageUrl: string;
  alt: string;
  buttonText: string;
}

const AdsCarousel: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  const fetchRandomImages = async () => {
    try {
      const response = await axios.get(
        "https://api.pexels.com/v1/search?query=product&size=small&orientation=landscape&per_page=7",
        {
          headers: {
            Authorization:
              "N9wgadcmAj2BqNR2TD6PWN8YMJvuqgSH9U339yI1uoM9QQhmJPhPDyBX",
          },
        }
      );

      const texts = [
        "Product A",
        "Amazing Deals",
        "Limited Time Offer",
        "Shop Now",
      ];

      const randomImages = response.data.photos.map(
        (photo: any, index: number) => ({
          id: photo.id,
          imageUrl: photo.src.large,
          alt: photo.url,
          buttonText: texts[index % texts.length],
        })
      );

      return randomImages;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  useEffect(() => {
    const getImages = async () => {
      const randomImages = await fetchRandomImages();
      setImages(randomImages);
    };

    getImages();
  }, []);

  return (
    <>
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation]}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="slide-container">
              <img
                src={image.imageUrl}
                alt={image.alt}
                width={50}
                height={50}
                loading="lazy"
                style={{ objectFit: "cover" }}
              />
              <div className="image-buttons">
                <button className="generate-text-button">
                  {image.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </>
  );
};

export default AdsCarousel;
