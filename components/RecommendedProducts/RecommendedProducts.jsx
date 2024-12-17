"use client";
import { Fragment, Suspense } from "react";
import { Thumb } from "../Thumb/Thumb";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRecommendedProducts } from "@/hooks/ecommerce.hooks";

const RecommendedProducts = ({ text = "Možda će Vas zanimati", slug }) => {
  const { data } = useRecommendedProducts({ slug: slug });

  return (
    <>
      {data?.items?.length > 0 && (
        <div className="max-sm:w-[95%] mt-[6rem] max-sm:mx-auto md:mx-[3rem] max-sm:mt-[3rem]  overflow-visible">
          <div className="flex justify-between w-full items-center">
            <h5 className="text-[1.5rem] font-bold max-md:text-[1.1rem] ">
              {text}
            </h5>
          </div>
          <div className="max-sm:mt-[1rem] mt-[2.5rem]">
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation]}
              fadeEffect={{ crossFade: true }}
              rewind={true}
              className="mySwiper3 w-full select-none"
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1680: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
            >
              {data?.items?.map(({ id }) => {
                return (
                  <Fragment key={id}>
                    <Suspense
                      fallback={
                        <SwiperSlide className="aspect-2/3 h-full w-full animate-pulse bg-slate-300" />
                      }
                    >
                      <SwiperSlide key={id} className="hoveredColor">
                        <Thumb id={id} slug={id} />
                      </SwiperSlide>
                    </Suspense>
                  </Fragment>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendedProducts;
