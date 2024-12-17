"use client";

export const LoadMore = ({ page, isFetching, setPage, data }) => {
  return (
    <div
      className={`flex mt-10 py-2 px-[3rem] bg-[#f2f2f2] items-center justify-center gap-1`}
    >
      <span
        className={`cursor-pointer select-none py-1 px-3 border border-white hover:border-[#04b400] hover:text-[#04b400] rounded-lg`}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        {isFetching ? "Učitavanje..." : "Učitaj još"}
      </span>
    </div>
  );
};
