import { get, list } from "@/api/api";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { generateOrganizationSchema } from "@/_functions";
import RecommendedCategories from "@/components/sections/homepage/RecommendedCategories";
import NewCategoriesSections from "@/components/NewCategoriesSection/NewCategoriesSection";
import NewsLetterInstagramSection from "@/components/NewsLetterInstgramSection/NewsLetterInstagramSection";
import RecommendedProducts from "@/components/sections/homepage/RecommendedProducts";
import { BannerSlider } from "@/components/BannerSlider/BannerSlider";
import NewInProducts from "@/components/NewInProducts/NewInProducts";
import { Suspense } from "react";

const getBanners = () => {
  return get("/banners/index_slider").then((res) => res?.payload);
};
const getMobileBanners = () => {
  return get("/banners/index_slider_mobile").then((res) => res?.payload);
};
const getBannersCategories = () => {
  return get("/banners/index-first-banner").then((res) => res?.payload);
};
const getRecommendedProducts = () => {
  return list("/products/section/list/recommendation").then(
    (res) => res?.payload?.items
  );
};
const getIndexBanner = () => {
  return get("/banners/index_banner").then((res) => res?.payload);
};
const fetchAction4 = () => {
  return get("/banners/akcija4").then((response) => response?.payload);
};
const getNew = () => {
  return list("/categories/section/recommended").then((res) => res?.payload);
};

const Home = async () => {
  const [
    banners,
    recommendedProducts,
    categories,
    mobileBanners,
    recommendedCategories,
  ] = await Promise.all([
    getBanners(),
    getRecommendedProducts(),
    getBannersCategories(),
    getMobileBanners(),
    getNew(),
  ]);

  let all_headers = headers();
  let base_url = all_headers.get("x-base_url");

  let schema = generateOrganizationSchema(base_url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="block relative overflow-hidden">
        <BannerSlider banners={{ desktop: banners, mobile: mobileBanners }} />
        <div className="overflow-hidden">
          <RecommendedProducts
            recommendedProducts={recommendedProducts}
            action4={`Izdvajamo za Vas`}
          />
        </div>
        <Suspense>
          <NewInProducts />
        </Suspense>
        <RecommendedCategories categories={categories} />
        <NewCategoriesSections categories={recommendedCategories} />
        <NewsLetterInstagramSection />
      </div>
    </>
  );
};

export default Home;

export const revalidate = 30;

const getSEO = () => {
  return get("/homepage/seo").then((response) => response?.payload);
};

export const generateMetadata = async () => {
  const data = await getSEO();
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Početna | Fashion Demo",
    description:
      data?.meta_description ?? "Dobrodošli na Fashion Demo Online Shop",
    alternates: {
      canonical: data?.meta_canonical_link ?? canonical,
    },
    robots: {
      index: data?.meta_robots?.index ?? true,
      follow: data?.meta_robots?.follow ?? true,
    },
    openGraph: {
      title: data?.social?.share_title ?? "Početna | Fashion Demo",
      description:
        data?.social?.share_description ??
        "Dobrodošli na Fashion Demo Online Shop",
      type: "website",
      images: [
        {
          url: data?.social?.share_image ?? "",
          width: 800,
          height: 600,
          alt: "Fashion Demo",
        },
      ],
      locale: "sr_RS",
    },
  };
};
