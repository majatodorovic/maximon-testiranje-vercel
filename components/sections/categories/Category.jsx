import { list, post, get } from "@/api/api";
import CategoryData from "./CategoryPage";
import { notFound } from "next/navigation";

const Category = async ({ path }) => {
  return <CategoryData slug={path} />;
};

export default Category;
