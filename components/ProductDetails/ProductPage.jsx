"use client";

import React, { Suspense } from "react";
import { ProductGallery } from "@/components/ProductDetails/ProductGallery";
import { ProductInfo } from "@/components/ProductDetails/ProductInfo";
import { Breadcrumbs } from "@/components/ProductDetails/InfoData/breadcrumbs";
import UpsellProducts from "@/components/UpsellProducts/UpsellProducts";
import CrossSellProducts from "../CrosssellProducts/CrosssellProducts";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import RecommendedProducts from "../RecommendedProducts/RecommendedProducts";

export const ProductPage = ({ path, categoryId, canonical, base_url, id }) => {
  return (
    <>
      <div className="max-md:mt-[1rem]  max-md:w-[95%]  max-md:mx-auto md:mx-[3rem] mt-6 max-lg:hidden">
        <Suspense
          fallback={<div className={`h-2 bg-slate-300 animate-pulse w-full`} />}
        >
          <Breadcrumbs id={id} categoryId={categoryId} />
        </Suspense>
      </div>
      <div className="max-md:mt-[1.01rem] mt-[2rem] max-md:w-[95%]  max-md:mx-auto mx-[3rem] gap-x-[3.063rem] grid grid-cols-4">
        <Suspense
          fallback={
            <div
              className={`h-[50rem] bg-slate-200 animate-pulse col-span-2 max-lg:col-span-4`}
            />
          }
        >
          <ProductGallery slug={id} />
        </Suspense>
        <ProductInfo
          path={path}
          id={id}
          canonical={canonical}
          base_url={base_url}
        />
      </div>
      <Suspense
        fallback={
          <div className={`grid grid-cols-4 gap-5 mt-10`}>
            {Array.from({ length: 4 }).map((item, i) => {
              return (
                <div
                  key={i}
                  className={`w-full min-w-0 h-full aspect-2/3 bg-slate-300 animate-pulse`}
                ></div>
              );
            })}
          </div>
        }
      >
        <UpsellProducts slug={id} />
        <CrossSellProducts slug={id} />
        <RecommendedProducts slug={id} />
        <RelatedProducts slug={id} />
      </Suspense>
    </>
  );
};
