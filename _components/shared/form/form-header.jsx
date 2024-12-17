"use client";

import { icons } from "@/_lib/icons";

export const FormHeader = ({ title, icon }) => {
  return (
    <div className={`flex items-center justify-center mx-auto gap-1`}>
      <span className={`w-[1.8rem]`}>{icons[icon]}</span>
      <h2 className={`uppercase text-xl text-center`}>{title}</h2>
    </div>
  );
};
