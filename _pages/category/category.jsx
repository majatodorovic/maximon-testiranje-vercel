import { Suspense } from "react";
import { get } from "@/api/api";
import Loading from "@/components/sections/categories/Loader";
import Category from "@/components/sections/categories/Category";
import CategoryData from "@/components/sections/categories/CategoryPage";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { headers } from "next/headers";

export const CategoryPage = ({
  params: { path },
  searchParams: { sort: sortURL, strana, filteri, viewed },
  category_id,
}) => {
  const slug = path[path?.length - 1];
  const sort = (sortURL ?? "_")?.split("_");
  const sortField = sort[0];
  const sortDirection = sort[1];

  const page = Number(strana) > 0 ? Number(strana) : 1;

  const filters = filteri?.split("::")?.map((filter) => {
    const [column, selected] = filter?.split("=");
    const selectedValues = selected?.split("_");
    return {
      column,
      value: {
        selected: selectedValues,
      },
    };
  });

  let headersList = headers();
  let base_url = headersList?.get("x-base_url");

  return (
    <CategoryData
      category_id={category_id}
      base_url={base_url}
      path={path}
      slug={slug}
      viewed={viewed}
      sortField={sortField}
      sortDirection={sortDirection}
      strana={page}
      allFilters={[]}
      filters={filters}
    />
  );
};
