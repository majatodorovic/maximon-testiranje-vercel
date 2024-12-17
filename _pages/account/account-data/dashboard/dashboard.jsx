"use client";

import { useGetAccountData } from "@/hooks/ecommerce.hooks";
import { getName } from "@/_pages/account/sidebar";
import { SectionHeader } from "@/_pages/account/account-data/shared";
import { SectionBody } from "@/_pages/account/account-data/shared/section-body";
import { icons } from "@/_lib/icons";
import { DashboardBody } from "@/_pages/account/account-data/dashboard/dashboard-body";

export const Dashboard = () => {
  const { data: basic_data } = useGetAccountData(`/customers/profile`);
  const name = getName(basic_data);

  return (
    <>
      <SectionHeader title={`Dobrodošli, ${name}`} />
      <SectionBody>
        <DashboardBody />
      </SectionBody>
    </>
  );
};
