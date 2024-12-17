import Image from "next/image";
import React, { useEffect } from "react";
import {
  useAddToWishlist,
  useIsInWishlist,
  useRemoveFromWishlist,
} from "@/hooks/ecommerce.hooks";

export const Wishlist = ({ product }) => {
  const { mutate: addToWishlist, isSuccess: isAdded } = useAddToWishlist();

  const { mutate: removeFromWishlist, isSuccess: isRemoved } =
    useRemoveFromWishlist();

  const { data, refetch: reCheck } = useIsInWishlist({
    id: product?.data?.item?.basic_data?.id_product,
  });

  const isInWishlist = data?.exist;
  const wishlist_id = data?.wishlist_item_id;

  useEffect(() => {
    reCheck();
  }, [isAdded, isRemoved]);

  return (
    <div
      className={`${
        !isInWishlist && "hover:bg-red-500"
      }  scale-90 group cursor-pointer rounded-full p-2`}
      onClick={() => {
        if (isInWishlist) {
          removeFromWishlist({ id: wishlist_id });
        } else {
          addToWishlist({
            id: product?.data?.item?.basic_data?.id_product,
            name: product?.data?.item?.basic_data?.name,
          });
        }
      }}
    >
      {isInWishlist ? (
        <Image
          src={`/icons/heart-active.png`}
          alt="wishlist"
          width={39}
          height={39}
          className={`w-10 h-auto`}
        />
      ) : (
        <Image
          src={"/icons/heart.png"}
          alt="wishlist"
          width={39}
          height={39}
          className={`favorite w-10 h-auto ${
            !isInWishlist && "group-hover:invert"
          }`}
        />
      )}
    </div>
  );
};
