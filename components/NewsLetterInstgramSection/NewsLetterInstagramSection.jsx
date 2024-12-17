"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import InstragramSection from "../sections/homepage/InstagramSection";
import { post } from "@/api/api";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const NewsLetterInstagramSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const changeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email?.includes("@")) {
      setError(true);
    } else {
      setError(false);
      await post("/newsletter", { email: email }).then((response) => {
        if (!response?.code) {
          setEmail("");
          toast.error(response?.payload?.message || "Error 404", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setError(true);
        } else {
          setEmail("");
          setError(false);
          toast.success(response?.payload?.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }
  };

  const { data: instagramImages } = useQuery({
    queryKey: ["instagramImages"],
    queryFn: async () => {
      const resData = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM}`
      );

      const data = await resData.json();

      return data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <div className="grid lg:grid-cols-[1fr,2fr] mt-10 lg:mt-32 gap-14 2xl:gap-28 max-md:w-[95%] mx-auto md:w-full md:px-[3rem]">
        <div className="self-center">
          <p className="font-bold text-[30px] md:text-[40px] text-black">
            Ostvari 10% popusta
          </p>
          <p className="text-[16px] font-normal text-black my-8">
            Prijavi se na naš bilten i dobićeš 10% popusta na sledeću kupovinu,
            pristup ekskluzivnim promocijama i još mnogo toga!
          </p>
          <form className="relative w-full" onSubmit={onSubmit}>
            <input
              placeholder="Unesite svoj email"
              title="Unesite validan email"
              type="text"
              id="email"
              name="email"
              onChange={changeHandler}
              value={email}
              className={`${
                error ? "border-red-500" : "border-[#cecece]"
              } w-full max-md:w-full py-3 border rounded  px-4  placeholder:text-base placeholder:text-[#cecece] placeholder:font-normal  focus:border-[#cecece] focus:outline-none focus:ring-0`}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
              type="submit"
            >
              <Image
                alt="send icon"
                src={"/icons/send.png"}
                width={34}
                height={28}
                className="w-7 h-auto"
              />
            </button>
          </form>
          <p className="text-[17px] text-black font-normal mb-3 mt-5 lg:mt-20">
            Brza i laka kupovina Vaših omiljenih artikala <br /> putem mobilne
            aplikacije.
          </p>
          <div className="flex items-center gap-7">
            <Image
              alt="app store"
              src={"/images/app-store.png"}
              width={120}
              height={40}
              className="w-28 h-auto"
            />
            <Image
              alt="google play"
              src={"/images/google-play.png"}
              width={120}
              height={40}
              className="w-28 h-auto"
            />
          </div>
          <p className="text-base text-black mt-5 lg:mt-14 font-normal">
            Podelite svoje jedinstveno onlajn iskustvo sa našim <br /> timom i
            pomozite nam da ostanemo bolji.
          </p>
          <Link
            href="/anketa"
            className="text-base text-black mt-5 font-bold underline block"
          >
            Ostavite vaše mišljenje
          </Link>
        </div>
        <div>
          <InstragramSection instagramImages={instagramImages} />
        </div>
      </div>
    </div>
  );
};

export default NewsLetterInstagramSection;
