import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const banners = [
  { id: 1, img: "/banner/kiddiesbanner1.jpg", title: "Up to 50% OFF Kids Items" },
  { id: 2, img: "/banner/kiddiesbanner2.jpg", title: "Flat 50% OFF Fashion" },
  { id: 3, img: "/banner/kiddiesbanner1.jpg", title: "Flat 40% OFF Shoes" },
  { id: 4, img: "/banner/kiddiesbanner2.jpg", title: "Beauty Sale Up to 60% OFF" },
];

function Carousel() {
  return (
      <div className="w-full">
  <Swiper
    modules={[Pagination, Autoplay]}
    spaceBetween={0}
    slidesPerView={1}
    pagination={{ clickable: true }}
    autoplay={{ delay: 4000, disableOnInteraction: false }}
    loop
    className="w-full hero-swiper"
  >
    {banners.map((banner) => (
      <SwiperSlide key={banner.id}>
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">

          {/* Background Image */}
          <img
            src={banner.img}
            alt={banner.title}
            className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-12 md:px-20 text-white max-w-2xl animate-fadeIn">

            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
              {banner.title}
            </h2>

            <p className="mt-4 text-sm sm:text-base md:text-lg opacity-90">
              Limited time offer. Grab your favorites before they’re gone!
            </p>

            <button className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold text-sm md:text-base hover:bg-black hover:text-white transition-all duration-300 shadow-lg">
              Shop Now
            </button>

          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>
  );
}

export default Carousel;
