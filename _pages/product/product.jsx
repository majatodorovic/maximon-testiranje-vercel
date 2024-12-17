import { get } from "@/api/api";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import { headers } from "next/headers";
import { ProductPage } from "@/components/ProductDetails/ProductPage";

export const ProductDetailsPage = ({ path, category_id, id }) => {
  let headers_list = headers();
  let canonical = headers_list.get("x-pathname");
  let base_url = headers_list.get("x-base_url");

  return (
    <ProductPage
      path={path?.[path?.length - 1]}
      id={id}
      categoryId={category_id}
      canonical={canonical}
      base_url={base_url}
    />
  );
};
