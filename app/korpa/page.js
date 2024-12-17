import { headers } from "next/headers";
import { get, list } from "@/api/api";
import { Suspense } from "react";
import { CheckoutPage } from "@/components/CheckoutPage/CheckoutPage";

const getPaymentOptions = async () => {
  return await get("/checkout/payment-options").then(
    (response) => response?.payload
  );
};
const getDeliveryOptions = async () => {
  return await get("/checkout/delivery-options").then(
    (response) => response?.payload
  );
};
const getRecommendedProducts = async () => {
  return await list("/products/section/list/recommendation").then(
    (res) => res?.payload?.items
  );
};
const getCountries = async () => {
  return await get(`/checkout/ddl/id_country`).then((res) => res?.payload);
};

const Cart = async () => {
  const [payment_options, delivery_options, recommended_products, countries] =
    await Promise.all([
      getPaymentOptions(),
      getDeliveryOptions(),
      getRecommendedProducts(),
      getCountries(),
    ]);

  return (
    <CheckoutPage
      payment_options={payment_options}
      delivery_options={delivery_options}
      recommendedProducts={recommended_products}
      countries={countries}
    />
  );
};

export default Cart;

export const revalidate = 30;

export const generateMetadata = async () => {
  const header_list = headers();
  let canonical = header_list?.get("x-pathname");
  return {
    title: `Korpa | Fashion Template`,
    description: "Dobrodošli na Fashion Template Online Shop",
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `Korpa | Fashion Template`,
      description: "Dobrodošli na Fashion Template Online Shop",
      type: "website",
      images: [
        {
          url: "https://api.fashiondemo.croonus.com/croonus-uploads/config/b2c/logo-c36f3b94e6c04cc702b9168481684f19.webp",
          width: 800,
          height: 600,
          alt: "Fashion Template",
        },
      ],
      locale: "sr_RS",
    },
  };
};
