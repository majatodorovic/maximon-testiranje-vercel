"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  useCategoryFilters,
  useCategoryProducts,
} from "@/hooks/ecommerce.hooks";
import Filters from "@/components/sections/categories/Filters";
import { Thumb } from "@/components/Thumb/Thumb";
import FiltersMobile from "@/components/sections/categories/FilterMobile";
import { LoadMore, Pagination } from "@/_components/pagination";

export const CategoryProducts = ({
  filters,
  strana,
  viewed,
  sortDirection,
  sortField,
  allFilters = [],
  slug,
  isSection,
}) => {
  let pagination_type = process.env.PAGINATION_TYPE;

  const router = useRouter();
  const [productsPerView, setProductsPerView] = useState(4);
  const [productsPerViewMobile, setProductsPerViewMobile] = useState(2);
  const params = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [isBeingFiltered, setIsBeingFiltered] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  //params iz URL-a
  const filterKey = params?.get("filteri");
  const pageKey = Number(params?.get("strana"));
  const sortKey = params?.get("sort");

  const viewedKey = Number(viewed ?? process.env["PAGINATION_LIMIT"]);

  const [page, setPage] = useState(pageKey > 0 ? pageKey : 1);
  const [sort, setSort] = useState({
    field: sortField ?? "",
    direction: sortDirection ?? "",
  });
  const [selectedFilters, setSelectedFilters] = useState(filters ?? []);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState(allFilters ?? []);
  const [changeFilters, setChangeFilters] = useState(false);
  const [lastSelectedFilterKey, setLastSelectedFilterKey] = useState("");

  // azuriramo query parametre sa selektovanim sortom, stranicom i filterima
  const updateURLQuery = (sort, selectedFilters, page) => {
    let sort_tmp;
    let filters_tmp;
    let page_tmp;
    let limit_tmp;

    if (sort?.field !== "" && sort?.direction !== "") {
      sort_tmp = `${sort?.field}_${sort?.direction}`;
    }

    if (selectedFilters?.length > 0) {
      filters_tmp = selectedFilters
        ?.map((filter) => {
          const selectedValues = filter?.value?.selected?.join("_");
          return `${filter?.column}=${selectedValues}`;
        })
        .join("::");
    } else {
      filters_tmp = "";
    }

    if (page > 1 && pagination_type === "pagination") {
      page_tmp = page;
    } else {
      page_tmp = 1;
    }

    if (pagination_type === "load_more") {
      limit_tmp = viewedKey ?? process.env.PAGINATION_LIMIT;
      if (page > 1) {
        limit_tmp = page * process.env.PAGINATION_LIMIT;
      }
    }

    return { sort_tmp, filters_tmp, page_tmp, limit_tmp };
  };

  const generateQueryString = (sort_tmp, filters_tmp, page_tmp, limit_tmp) => {
    let query_string = "";
    switch (pagination_type) {
      case "load_more":
      case "infinite_scroll":
        query_string = `?${filters_tmp ? `filteri=${filters_tmp}` : ""}${
          filters_tmp && (sort_tmp || limit_tmp) ? "&" : ""
        }${sort_tmp ? `sort=${sort_tmp}` : ""}${
          sort_tmp && limit_tmp ? "&" : ""
        }${limit_tmp ? `viewed=${limit_tmp}` : ""}`;
        break;
      default:
        query_string = `?${filters_tmp ? `filteri=${filters_tmp}` : ""}${
          filters_tmp && (sort_tmp || page_tmp) ? "&" : ""
        }${sort_tmp ? `sort=${sort_tmp}` : ""}${
          sort_tmp && page_tmp ? "&" : ""
        }${page_tmp > 1 ? `strana=${page_tmp}` : ""}`;
    }
    router.push(query_string, { scroll: false });

    return query_string;
  };

  useEffect(() => {
    const { sort_tmp, filters_tmp, page_tmp, limit_tmp } = updateURLQuery(
      sort,
      selectedFilters,
      page
    );

    generateQueryString(sort_tmp, filters_tmp, page_tmp, limit_tmp);
  }, [sort, selectedFilters, page]);

  const getPage = (page) => {
    switch (pagination_type) {
      case "pagination":
        return pageKey ?? 1;
      case "load_more":
        return page;
      case "infinite_scroll":
        return page;
    }
  };
  //dobijamo proizvode za kategoriju sa api-ja
  const {
    data,
    error,
    isError,
    isFetching,
    isFetched,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
  } = useCategoryProducts({
    slug,
    page: getPage(page),
    limit: viewedKey ?? process.env.PAGINATION_LIMIT,
    sort: sortKey ?? "_",
    setSelectedFilters: setSelectedFilters,
    filterKey: filterKey,
    setSort: setSort,
    render: false,
    setIsLoadingMore: setIsLoadingMore,
    isSection: isSection,
  });

  const mutateFilters = useCategoryFilters({
    slug,
    page,
    limit: 10,
    sort,
    selectedFilters: tempSelectedFilters,
    isSection: isSection,
  });

  //ako je korisnik dosao na stranicu preko linka sa prisutnim filterima u URL,onda se ti filteri selektuju i okida se api da azurira dostupne filtere
  useEffect(() => {
    if (filters?.length > 0) {
      mutateFilters.mutate({
        slug,
        selectedFilters: tempSelectedFilters,
        lastSelectedFilterKey,
        setAvailableFilters,
        availableFilters,
      });
    }
  }, []);

  //okidamo api za filtere na promenu filtera
  useEffect(() => {
    mutateFilters.mutate({
      slug,
      selectedFilters: tempSelectedFilters,
      lastSelectedFilterKey,
      setAvailableFilters,
      availableFilters,
    });
  }, [tempSelectedFilters?.length]);

  const getPaginationArray = (selectedPage, totalPages) => {
    const start = Math.max(1, selectedPage - 2);
    const end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const getItems = (pagination_type) => {
    switch (pagination_type) {
      case "infinite_scroll":
        return (data?.pages ?? [])?.flatMap((page) => page?.items);
      default:
        return data?.items;
    }
  };

  useEffect(() => {
    if (pagination_type === "infinite_scroll") {
      const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = window.innerHeight;

        // Calculate the percentage scrolled
        const scrollPosition = (scrollTop + clientHeight) / scrollHeight;

        // Check if the scroll position is greater than or equal to 70%
        if (scrollPosition >= 0.7 && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      };

      // Add event listener for scroll
      window.addEventListener("scroll", handleScroll);

      // Cleanup the event listener when component unmounts
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pagination_type, hasNextPage, isFetching, fetchNextPage]);

  return (
    <>
      <div className="max-md:hidden mt-[67px]">
        <Filters
          selectedFilters={selectedFilters}
          availableFilters={availableFilters}
          setSelectedFilters={setSelectedFilters}
          sort={sort}
          setPage={setPage}
          setSort={setSort}
          changeFilters={changeFilters}
          pagination={data?.pagination}
          setProductsPerView={setProductsPerView}
          productsPerView={productsPerView}
          setTempSelectedFilters={setTempSelectedFilters}
          setLastSelectedFilterKey={setLastSelectedFilterKey}
          setChangeFilters={setChangeFilters}
        />
      </div>
      <div
        className={`flex items-center gap-5 w-full px-2 mx-auto mt-[60px] md:hidden bg-white sticky top-[3.4rem] py-2 z-[51]`}
      >
        <button
          className={`flex items-center justify-center text-[0.9rem] md:text-[1.2rem] text-center py-2 flex-1 border`}
          onClick={() => setFilterOpen(true)}
        >
          Filteri
        </button>
        <div className={`flex items-center gap-3`}>
          {/*a div 40px high and 40px wide*/}
          <div
            className={`w-[30px] h-[30px] border-2 ${
              productsPerViewMobile === 1 && "border-black"
            }`}
            onClick={() => setProductsPerViewMobile(1)}
          ></div>
          {/*a div 40px high and 40px wide that has 9 smaller squares inside*/}
          <div
            className={`w-[30px] h-[30px] border grid grid-cols-2 ${
              productsPerViewMobile === 2 && "border-black"
            }`}
            onClick={() => setProductsPerViewMobile(2)}
          >
            {Array.from({ length: 4 }, (_, i) => {
              return (
                <div
                  key={i}
                  className={`col-span-1 border ${
                    productsPerViewMobile === 2 && "border-black"
                  }`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
      {data?.items?.length > 0 || data?.pages?.length > 0 ? (
        <>
          <div className={`max-lg:hidden px-[3rem]`}>
            <div
              className={`mt-[1.875rem] ${
                productsPerView === 2 && "w-[50%] mx-auto"
              } grid grid-cols-${productsPerView} gap-x-5 gap-y-10`}
            >
              {getItems(pagination_type)?.map(({ id }) => {
                return (
                  <Suspense
                    key={`suspense-${id}`}
                    fallback={
                      <div
                        className={`aspect-2/3 bg-slate-300 animate-pulse w-full h-full`}
                      />
                    }
                  >
                    <Thumb
                      slug={id}
                      key={`thumb-${id}`}
                      categoryId={slug ?? "*"}
                    />
                  </Suspense>
                );
              })}
            </div>
          </div>
          <div className={`lg:hidden w-[95%] mx-auto`}>
            <div
              className={`mt-[50px] grid grid-cols-${productsPerViewMobile} md:grid-cols-3 gap-x-[20px] gap-y-[36px]`}
            >
              {getItems(pagination_type)?.map(({ id }) => {
                return (
                  <Suspense
                    key={`suspense-${id}`}
                    fallback={
                      <div
                        className={`aspect-2/3 bg-slate-300 animate-pulse w-full h-full`}
                      />
                    }
                  >
                    <Thumb slug={id} key={`$thumb-${id}`} />
                  </Suspense>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full py-10 text-center">
          <h1 className="text-[#191919] text-[1.1rem]">
            U traženoj kategoriji nema proizvoda, ili izabrani filteri ne daju
            rezultate.
          </h1>
        </div>
      )}
      {data?.pagination?.total_pages > 1 &&
        process.env.PAGINATION_TYPE === "pagination" && (
          <Pagination
            generateQueryString={() => {
              const { sort_tmp, filters_tmp, page_tmp } = updateURLQuery(
                sort,
                selectedFilters,
                page
              );
              return generateQueryString(sort_tmp, filters_tmp, page_tmp);
            }}
            data={data}
            page={page}
            slug={slug}
            setPage={setPage}
            getPaginationArray={getPaginationArray}
          />
        )}
      {data?.pagination?.total_pages > 1 &&
        process.env.PAGINATION_TYPE === "load_more" && (
          <LoadMore
            data={data}
            setPage={setPage}
            page={page}
            isFetching={isFetching}
          />
        )}
      <div
        className={
          filterOpen
            ? `fixed top-0 left-0 w-full h-[100dvh] z-[3000] bg-white translate-x-0 duration-500`
            : `fixed top-0 left-0 w-full h-[100dvh] z-[3000] bg-white -translate-x-full duration-500`
        }
      >
        <FiltersMobile
          selectedFilters={selectedFilters}
          availableFilters={availableFilters}
          setSelectedFilters={setSelectedFilters}
          sort={sort}
          setPage={setPage}
          setSort={setSort}
          changeFilters={changeFilters}
          pagination={data?.pagination}
          setProductsPerView={setProductsPerView}
          productsPerView={productsPerView}
          setFilterOpen={setFilterOpen}
          setTempSelectedFilters={setTempSelectedFilters}
          setChangeFilters={setChangeFilters}
          tempSelectedFilters={tempSelectedFilters}
          setLastSelectedFilterKey={setLastSelectedFilterKey}
        />
      </div>
    </>
  );
};
