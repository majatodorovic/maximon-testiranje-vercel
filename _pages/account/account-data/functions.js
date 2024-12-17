import { AccountBasicData } from "@/_pages/account/account-data/basic-data";
import { Payments } from "@/_pages/account/account-data/payments";
import { Shippings } from "@/_pages/account/account-data/shippings";
import { PreviousOrders } from "@/_pages/account/account-data/previous-orders";
import { PasswordChange } from "@/_pages/account/account-data/password-change";
import { Dashboard } from "@/_pages/account/account-data/dashboard";
import { Suspense } from "react";
import { Loader } from "@/_pages/account/account-data/loader";
import Logout from "./logout/Logout";

export const getActiveScreen = (active_tab) => {
  switch (active_tab) {
    case "dashboard":
      return (
        <Suspense fallback={<Loader />}>
          <Dashboard />
        </Suspense>
      );
    case "basic":
      return (
        <Suspense fallback={<Loader />}>
          <AccountBasicData />
        </Suspense>
      );
    case "payments":
      return (
        <Suspense fallback={<Loader />}>
          <Payments />
        </Suspense>
      );
    case "shipping":
      return (
        <Suspense fallback={<Loader />}>
          <Shippings />
        </Suspense>
      );
    case "orders":
      return (
        <Suspense fallback={<Loader />}>
          <PreviousOrders />
        </Suspense>
      );
    case "password-change":
      return (
        <Suspense fallback={<Loader />}>
          <PasswordChange />
        </Suspense>
      );
    case "logout":
      return <Logout />;
  }
};
