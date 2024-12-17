"use client";

import { getActiveTab } from "@/_pages/account/sidebar";
import { getActiveScreen } from "@/_pages/account/account-data";

export const AccountData = () => {
  const active_tab = getActiveTab();
  const active_screen = getActiveScreen(active_tab);

  return (
    <div
      className={`col-span-5 sm:col-span-4 bg-white rounded-lg shadow py-4 px-4`}
    >
      {active_screen}
    </div>
  );
};
