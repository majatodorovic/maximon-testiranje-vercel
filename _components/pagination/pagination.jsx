"use client";

import Link from "next/link";
import { Fragment } from "react";

export const Pagination = ({
  getPaginationArray = (r, m) => {},
  data,
  page,
  setPage,
  generateQueryString = () => {},
}) => {
  let query_string = generateQueryString();

  const handleQueryString = (page) => {
    let new_string = query_string;
    let page_string = query_string?.split("strana=")?.[1];

    if (page_string) {
      new_string = query_string?.replace(
        `strana=${page_string}`,
        `strana=${page + 1}`
      );
    }

    if (!page_string) {
      new_string = `${query_string}&strana=${page + 1}`;
    }
    return new_string;
  };

  return (
    <div
      className={`flex mt-10 py-2 px-[3rem] bg-[#f2f2f2] items-center justify-end gap-1`}
    >
      {getPaginationArray(
        data.pagination.selected_page,
        data.pagination.total_pages
      )?.map((num, index, array) => (
        <Fragment key={index}>
          {index === 0 && num !== 1 && (
            <>
              <Link
                href={`${handleQueryString(0)}`}
                className={`cursor-pointer select-none py-1 px-3 border border-white hover:border-[#04b400] hover:text-[#04b400] rounded-lg`}
                onClick={() => {
                  setPage(1);
                  window.scrollTo(0, 0);
                }}
              >
                1
              </Link>
              {num - 1 !== 1 && (
                <span className={`select-none py-1 px-3 rounded-lg`}>...</span>
              )}
            </>
          )}
          {index > 0 && num - array[index - 1] > 1 && (
            <span className={`select-none py-1 px-3 rounded-lg`}>...</span>
          )}
          <Link
            href={`${handleQueryString(num - 1)}`}
            className={`${
              num === data.pagination.selected_page
                ? "cursor-pointer select-none bg-[#04b400] py-1 px-3 rounded-lg text-white"
                : "cursor-pointer select-none py-1 px-3 border border-white hover:border-[#04b400] hover:text-[#04b400] rounded-lg"
            }`}
            onClick={() => {
              setPage(num);
              window.scrollTo(0, 0);
            }}
          >
            {num}
          </Link>
          {index === array.length - 1 &&
            num !== data.pagination.total_pages && (
              <>
                {data.pagination.total_pages - num !== 1 && (
                  <span className={`select-none py-1 px-3  rounded-lg`}>
                    ...
                  </span>
                )}
                <Link
                  href={`${handleQueryString(data.pagination.total_pages - 1)}`}
                  className={`cursor-pointer select-none py-1 px-3 border border-white hover:border-[#04b400] hover:text-[#04b400] rounded-lg`}
                  onClick={() => {
                    setPage(data.pagination.total_pages);
                    window.scrollTo(0, 0);
                  }}
                >
                  {data.pagination.total_pages}
                </Link>
              </>
            )}
        </Fragment>
      ))}
    </div>
  );
};
