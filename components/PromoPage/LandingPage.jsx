"use client";

import Image from "next/image";
import { Thumb } from "@/components/Thumb/Thumb";
import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  useLandingPageBasicData,
  useLandingPageConditions,
  useLandingPageThumb,
} from "@/hooks/ecommerce.hooks";
import { Fragment, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const LandingPage = ({ slug }) => {
  const {
    data: basicData,
    isFetching: isFetchingBasicData,
    error: isErrorBasicData,
  } = useLandingPageBasicData({ slug: slug });
  const {
    data: thumb,
    isFetching: isFetchingThumb,
    isError: isErrorThumb,
  } = useLandingPageThumb({ slug: slug });
  const { data: products } = useLandingPageConditions({ slug: slug });

  return (
    <>
      <div className={`w-[93.5%] mx-auto`}>
        <div className={`mt-[3rem] md:mt-[9rem] pb-10`}>
          <div className={`flex items-start flex-col justify-center`}>
            {isFetchingBasicData ? (
              <div className="h-[50px] mb-4 w-full bg-slate-300 object-cover animate-pulse"></div>
            ) : (
              <h1
                className={`text-2xl mt-3 mb-10 border-b pb-2 border-b-croonus-1 font-medium self-start w-full`}
              >
                {basicData?.name}
              </h1>
            )}
            <div className={`relative w-full`}>
              {isFetchingBasicData ? (
                <>
                  <div className="max-md:h-[250px] h-[350px] w-full bg-slate-300 object-cover animate-pulse"></div>
                </>
              ) : (
                basicData?.image && (
                  <div className={`relative`}>
                    <Image
                      src={basicData?.image}
                      alt={``}
                      width={1920}
                      height={400}
                      priority
                      quality={100}
                      style={{ objectFit: "cover" }}
                      className={`w-full h-auto`}
                    />
                  </div>
                )
              )}
            </div>
            {isFetchingBasicData ? (
              <div className="h-[50px] w-full bg-slate-300 object-cover animate-pulse mt-5"></div>
            ) : (
              <>
                <div
                  className={`${
                    basicData?.gallery?.length > 0
                      ? `grid grid-cols-2 gap-x-5 gap-y-5`
                      : ``
                  } mt-10`}
                >
                  <div
                    className={`${
                      basicData?.gallery?.length > 0 && `col-span-1 deffont`
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: basicData?.description,
                    }}
                  />

                  <div
                    className={`${
                      basicData?.gallery?.length > 0 ? `block` : `hidden`
                    }
                `}
                  >
                    <Swiper
                      style={{ width: "40%" }}
                      modules={[Pagination]}
                      pagination={{ clickable: true }}
                    >
                      {basicData?.gallery?.map((image, imageIndex) => {
                        return (
                          <SwiperSlide key={`imageIndex-${imageIndex}`}>
                            <Image
                              src={image?.image}
                              alt={``}
                              width={1920}
                              height={263}
                              priority
                              quality={100}
                              style={{ objectFit: "cover" }}
                              className={`w-full h-auto`}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              </>
            )}
            <div className="w-full mt-16">
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
                {products?.items?.map(({ id }) => {
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
            <div
              className={`grid grid-cols-2 w-full md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5 mt-16`}
            >
              {isFetchingThumb ? (
                <>
                  {Array.from({ length: 4 }, (x, i) => (
                    <div
                      key={i}
                      className="max-md:h-[250px] h-[500px] w-full col-span-1 bg-slate-300 object-cover animate-pulse"
                    ></div>
                  ))}
                </>
              ) : (
                thumb?.items?.map((thumbItem, thumbItemIndex) => {
                  return (
                    <div
                      key={`thumbItemIndex-${thumbItemIndex}`}
                      className={`col-span-1 flex flex-col items-center justify-center p-5 gap-3 border border-croonus-1 rounded-2xl`}
                    >
                      {thumbItem?.name && (
                        <Link href={`${thumbItem?.url}`}>
                          {" "}
                          <h1 className={`text-2xl font-medium`}>
                            {thumbItem?.name}
                          </h1>
                        </Link>
                      )}
                      {thumbItem?.description && (
                        <p className={`text-center`}>
                          {thumbItem?.description}
                        </p>
                      )}
                      {thumbItem?.thumb_image && (
                        <Link href={`${thumbItem?.url}`}>
                          {" "}
                          <div className={``}>
                            <Image
                              src={thumbItem?.thumb_image}
                              alt={``}
                              width={500}
                              height={203}
                              priority
                              quality={100}
                              style={{ objectFit: "contain" }}
                              className={`w-full h-auto`}
                            />
                          </div>
                        </Link>
                      )}
                      {thumbItem?.button && (
                        <Link href={`${thumbItem?.url}`} className={`w-full`}>
                          <button
                            className={`rounded-[5rem] bg-croonus-2 text-white p-2 mt-2 w-full hover:scale-105 hover:bg-opacity-90 transition-all duration-500`}
                          >
                            {thumbItem?.button}
                          </button>
                        </Link>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
