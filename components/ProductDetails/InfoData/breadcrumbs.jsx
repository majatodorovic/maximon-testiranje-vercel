"use client";
import Link from "next/link";
import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "@/api/api";
import { generateBreadcrumbSchema } from "@/_functions";

export const Breadcrumbs = ({ id, base_url, categoryId }) => {
  const { data: breadcrumbs } = useSuspenseQuery({
    queryKey: ["breadcrumbs", id],
    queryFn: async () => {
      return await get(
        `/product-details/breadcrumbs/${id}?categoryId=${categoryId ?? "*"}`
      ).then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Link href={`/`} className={`text-[#191919] text-[0.95rem] font-normal`}>
        Početna
      </Link>{" "}
      <>/</>
      {(breadcrumbs?.steps ?? [])?.map((breadcrumb, index, arr) => {
        return (
          <div className="flex items-center gap-2" key={breadcrumb?.id}>
            <Link
              href={`/${breadcrumb?.link?.link_path}`}
              className="text-[#000] text-[0.95rem] font-normal"
            >
              {breadcrumb?.name}
            </Link>
            {index !== arr.length - 1 && <>/</>}
          </div>
        );
      })}
      <>/</>
      <h1 className="text-[#000] text-[0.95rem] font-normal">
        {breadcrumbs?.end?.name}
      </h1>
    </div>
  );
};
