"use client";
import Image from "next/image";
import React from "react";

const InstagramSection = ({ instagramImages }) => {
  return (
    <div>
      <p className="text-[29px] font-bold text-black mb-8">#instagram posts</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {instagramImages?.data?.slice(0, 6)?.map((image, index) => (
          <div
            className={`${
              image?.media_type === "VIDEO" && "hidden"
            } w-full aspect-square relative`}
            key={index}
          >
            <Image
              src={image?.media_url}
              fill
              sizes="100vw"
              alt={image?.caption}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramSection;
