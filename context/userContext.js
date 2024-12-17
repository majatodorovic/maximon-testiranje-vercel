"use client";
import { useContext, useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  handleLogin,
  handleLogout,
  useInvalidateBadges,
} from "@/context/functions";

export const userContext = createContext({
  loggedIn: false,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const customer_token = Cookies.get("customer_token");
    if (customer_token?.includes("web")) {
      setIsLoggedIn(true);
    }
  }, []);

  const { invalidateBadges } = useInvalidateBadges();

  return (
    <userContext.Provider
      value={{
        loggedIn: isLoggedIn,
        login: (customer_token) => {
          handleLogin(setIsLoggedIn, customer_token, invalidateBadges);
        },
        logout: (logOut) => {
          handleLogout(setIsLoggedIn, invalidateBadges, logOut);
        },
      }}
    >
      {children}
    </userContext.Provider>
  );
};
