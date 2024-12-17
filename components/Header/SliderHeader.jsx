"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import LeftIcon from "../svg/LeftIcon";
import RightIcon from "../svg/RightIcon";

const SliderHeader = () => {
  const [swiper, setSwiper] = useState(null);
  const banners = [
    "Besplatna isporuka za iznos preko 5.000 RSD",
    "Besplatna isporuka za iznos preko 10.000 RSD",
  ];

  return (
    <div className=" max-w-[30%] justify-between flex items-center">
      <button className="" type="button" onClick={() => swiper.slidePrev()}>
        <LeftIcon />
      </button>
      <Swiper
        className={`!overflow-hidden !max-w-[80%]`}
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={(swiper) => setSwiper(swiper)}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={banners.length <= 2 ? false : true}
        modules={[Autoplay]}
        centeredSlides={true}
      >
        {(banners ?? [])?.map((banner, index) => (
          <SwiperSlide key={index}>
            <p className="text-sm font-normal text-black bg-topHeader">
              {banner}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="" type="button" onClick={() => swiper.slideNext()}>
        <RightIcon />
      </button>
    </div>
  );
};

export default SliderHeader;
