"use client";
import { useCartContext } from "@/api/cartContext";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { get } from "@/api/api";
import { useCartBadge, useWishlistBadge } from "@/hooks/ecommerce.hooks";

const HeaderIcons = () => {
  const { data: cartCount } = useCartBadge();
  const { data: wishListCount } = useWishlistBadge();

  return (
    <div className="flex items-center">
      <Link href="/login">
        <Image
          src="/icons/user.png"
          width={21}
          height={21}
          className="object-cover w-7 h-auto"
          alt="user"
        />
      </Link>
      <Link href="/lista-zelja">
        <div className="relative">
          <Image
            src="/icons/heart.png"
            width={21}
            height={21}
            className="object-cover mx-5 w-5 h-auto"
            alt="heart"
          />
          <span className="absolute -top-2.5 text-white right-1 bg-[#e10000] rounded-full w-5 h-5 flex items-center justify-center  text-xs">
            {wishListCount}
          </span>
        </div>
      </Link>
      <Link href="/korpa">
        <div className="relative">
          <Image
            src="/icons/shopping-bag.png"
            width={21}
            height={21}
            className="object-cover w-8 h-auto"
            alt="shopping-bag"
          />
          <span className="absolute -top-1 text-white -right-2 bg-[#e10000] rounded-full w-5 h-5 flex items-center justify-center  text-xs">
            {cartCount}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default HeaderIcons;
