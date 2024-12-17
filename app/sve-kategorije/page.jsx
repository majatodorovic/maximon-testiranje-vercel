import { get } from "@/api/api";
import Link from "next/link";

const getCategories = () => {
  return get("/categories/product/tree").then((res) => res?.payload);
};

const AllCategories = async () => {
  const categories = await getCategories();

  const renderCategories = (categories) => {
    return (categories ?? [])?.map((item, i) => {
      let has_children = item?.children?.length > 0 && item?.children;
      if (has_children) {
        return (
          <div key={item?.id} className={`w-full col-span-1 h-fit`}>
            <div className={`flex items-center justify-between`}>
              <Link
                href={`/${item?.link?.link_path}`}
                className={`hover:text-croonus-3 ${
                  !item?.parent_id ? "text-xl font-bold" : ""
                }`}
              >
                {item?.name}
              </Link>
            </div>
            {renderCategories(item?.children)}
          </div>
        );
      } else {
        return (
          <div key={item?.id} className={`w-full col-span-1 h-fit`}>
            <Link
              href={`/${item?.link?.link_path}`}
              className={`hover:text-croonus-3 ${
                !item?.parent_id ? "text-xl font-bold" : ""
              }`}
            >
              {item?.name}
            </Link>
          </div>
        );
      }
    });
  };

  return (
    <div
      className={`max-sm:w-[95%] max-sm:mx-auto md:mx-5 lg:mx-[3rem] mt-[3rem] overflow-visible`}
    >
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5`}>
        {renderCategories(categories)}
      </div>
    </div>
  );
};

export default AllCategories;
