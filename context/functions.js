"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateBadges = () => {
  const queryClient = useQueryClient();

  const invalidateBadges = (query_keys) => {
    return queryClient?.invalidateQueries({ queryKey: [...query_keys] });
  };

  return { invalidateBadges };
};

export const handleLogin = (
  setIsLoggedIn,
  customer_token,
  invalidateBadges
) => {
  Cookies.set("customer_token", customer_token, { expires: 365 });
  setIsLoggedIn(true);
  invalidateBadges(["cartBadge", "wishlistBadge"]).then((r) => r);
  window.location.href = "/nalog";
};

export const handleLogout = (setIsLoggedIn, invalidateBadges, logOut) => {
  setIsLoggedIn(false);
  const device_token = Cookies.get("device_token");
  logOut();
  Cookies.set("customer_token", device_token, { expires: 365 });
  invalidateBadges(["cartBadge", "wishlistBadge"]).then((r) => r);
  window.location.href = "/login";
};
