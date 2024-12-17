"use client";

import { Button } from "@/_pages/account/account-data/shared";
import buttons from "./buttons.json";
import { SidebarBasic } from "@/_pages/account/sidebar/sidebar-basic";
import { Suspense } from "react";

export const Sidebar = () => {
  let btns = buttons;
  let show_shipping_options = process.env.SHOW_CHECKOUT_SHIPPING_FORM;

  if (show_shipping_options === "false") {
    btns = buttons?.filter((button) => button.tab !== "shipping");
  }
  return (
    <div
      className={`col-span-5 !h-fit sticky top-5 max-sm:row-start-2 sm:col-span-1 flex flex-col gap-3 p-4 bg-white rounded-lg shadow`}
    >
      <Suspense
        fallback={<div className={`h-5 w-full bg-slate-300 animate-pulse`} />}
      >
        <SidebarBasic />
      </Suspense>
      {(btns ?? [])?.map(({ tab, id, title }) => {
        return (
          <Button id={id} key={id} tab={tab} title={title} type={`sidebar`} />
        );
      })}
    </div>
  );
};
