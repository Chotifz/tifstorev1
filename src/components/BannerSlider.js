import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Pagination, EffectCoverflow, Autoplay } from "swiper/modules";

export default function BannerSlider({ banners }) {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 2000 }}
      coverflowEffect={{
        rotate: 0,
        stretch: 260,
        depth: 150,
        modifier: 2.7,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Pagination, Autoplay]}
      className="swiper-container two"
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <div className="slider-image">
            <img src={`/assets/images/banner/${banner.image}`} alt={`slide ${index + 1}`} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}