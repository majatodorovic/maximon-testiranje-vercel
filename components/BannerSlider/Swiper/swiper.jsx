"use client";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";
import { Swiper as Slider } from "swiper/react";
import { useState } from "react";
import {
  renderBannerPagination,
  available_modules,
  getSwiperModules,
} from "@/components/BannerSlider/Swiper/functions";
import { SwiperSlide } from "swiper/react";
import { Slide } from "./swiper-slide";

export const Swiper = ({ swiper_data, className }) => {
  const [swiper, setSwiper] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    slidesPerView,
    modules,
    autoplay,
    spaceBetween,
    breakpoints,
    navigation,
    pagination,
    slides,
    num_of_slides,
    type,
    rewind,
  } = swiper_data;

  const handleNextSlide = () => {
    swiper.slideNext();
  };

  const handlePrevSlide = () => {
    swiper.slidePrev();
  };

  const handleSlideTo = (index) => {
    swiper.slideTo(index);
  };

  // const is_mobile = useIsMobile();

  switch (type) {
    case "banner":
      return (
        <>
          <Slider
          // style={{height: '80vh'}}
            className={className}
            rewind={rewind}
            autoplay={modules?.includes("Autoplay") ? autoplay : false}
            onSwiper={(swiper) => setSwiper(swiper)}
            onSlideChange={({ activeIndex }) => {
              setCurrentSlide(activeIndex);
            }}
            modules={[
              ...getSwiperModules({
                modules: modules,
                available_modules: available_modules,
              }),
            ]}
            navigation={modules?.includes("Navigation") ? navigation : false}
            pagination={modules?.includes("Pagination") ? pagination : false}
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            breakpoints={breakpoints}
          >
            {slides?.map((banner) => (
              <SwiperSlide key={banner.id} className="!w-full !h-full">
                <Slide {...banner}>
                  <HeroSlideContent {...banner} />
                </Slide>
              </SwiperSlide>
            ))}
            {num_of_slides > 1 &&
              renderBannerPagination({
                current_slide: currentSlide,
                num_of_slides: num_of_slides,
                func: {
                  next: handleNextSlide,
                  prev: handlePrevSlide,
                  slideTo: handleSlideTo,
                },
              })}
          </Slider>
        </>
      );
    default:
      return (
        <>
          <Slider
            className={className}
            rewind={rewind}
            autoplay={modules?.includes("Autoplay") ? autoplay : false}
            onSwiper={(swiper) => setSwiper(swiper)}
            onSlideChange={({ activeIndex }) => {
              setCurrentSlide(activeIndex);
            }}
            modules={[
              ...getSwiperModules({
                modules: modules,
                available_modules: available_modules,
              }),
            ]}
            navigation={modules?.includes("Navigation") ? navigation : false}
            pagination={modules?.includes("Pagination") ? pagination : false}
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            breakpoints={breakpoints}
          >
            {slides?.map((banner) => (
              <SwiperSlide key={banner.id} className="!w-full !h-full">
                <Slide {...banner}>
                  <FeaturedSlideContent {...banner} />
                </Slide>
              </SwiperSlide>
            ))}
            {num_of_slides > 1 &&
              renderBannerPagination({
                current_slide: currentSlide,
                num_of_slides: num_of_slides,
                func: {
                  next: handleNextSlide,
                  prev: handlePrevSlide,
                  slideTo: handleSlideTo,
                },
              })}
          </Slider>
        </>
      );
  }
};

const HeroSlideContent = ({ title, subtitle, text, button }) => {
  return (
    <div className="absolute flex flex-col items-center md:items-start justify-center md:justify-start max-sm:gap-[20px] gap-[33px] max-sm:top-[50%] top-[40%] text-center left-[4%] transform -translate-y-1/2">
      {title && (
        <h1 className="text-white max-sm:text-base text-xl font-bold ">
          {title}
        </h1>
      )}
      {subtitle && (
        <h2 className="text-white max-sm:text-xl text-4xl font-bold uppercase">
          {subtitle}
        </h2>
      )}
      {text && (
        <p className="text-white text-left sm:max-w-[60%] max-sm:text-[0.925rem] text-base font-normal">
          {text}
        </p>
      )}
      {button && (
        <button className="bg-transparent  hover:bg-white hover:text-black transition-all duration-300  text-white text-sm font-bold uppercase py-4 px-12 max-sm:px-2 max-sm:py-2 max-sm:flex max-sm:items-center max-sm:justify-center border border-white max-sm:w-[250px]">
          {button}
        </button>
      )}
    </div>
  );
};

const FeaturedSlideContent = ({ title, subtitle, text, button }) => {
  return (
    <div className="absolute max-sm:left-0 max-sm:w-fit max-sm:mx-auto sm:pr-[7.25rem] h-full flex flex-col my-auto justify-center z-[5] right-0 top-0">
      {title && (
        <h2
          className="text-white text-[1.5rem] sm:text-[2.9rem] w-full max-w-[22.5rem] font-semibold leading-[100%]"
          style={{ textShadow: "black 0.05em 0 0.5em, black -0.05em 0 0.5em" }}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <h3
          className="text-white mt-3 text-[1.479rem] font-semibold leading-[100%]"
          style={{ textShadow: "black 0.1em 0 1em, black -0.1em 0 1em" }}
        >
          {subtitle}
        </h3>
      )}
      {text && (
        <p
          className="text-white font-light text-base"
          style={{ textShadow: "black 1px 0 10px, black -1px 0 10px" }}
        >
          {text}
        </p>
      )}
      {button && (
        <button className="mt-[2rem] max-sm:px-2 max-sm:py-2">{button}</button>
      )}
    </div>
  );
};
