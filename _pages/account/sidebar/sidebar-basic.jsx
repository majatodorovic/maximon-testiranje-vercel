"use client";

import { icons } from "@/_lib/icons";
import { useGetAccountData } from "@/hooks/ecommerce.hooks";
import { getName } from "@/_pages/account/sidebar/functions";

export const SidebarBasic = () => {
  const { data: basic_data } = useGetAccountData(`/customers/profile`);
  const name = getName(basic_data);

  return (
    <div className={`flex flex-col gap-3`}>
      <div className={`flex items-center justify-center gap-2`}>
        <div className={`p-2`}>
          <span className={`w-[1.5rem] block`}>{icons?.user}</span>
        </div>
        <span>{name}</span>
      </div>
    </div>
  );
};
