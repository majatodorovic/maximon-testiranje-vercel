"use client";

import Link from "next/link";
import Image from "next/image";
import { currencyFormat } from "@/helpers/functions";

export const OrderItemsInfo = ({ order }) => {
  return (
    <div
      className={`col-span-2 md:col-span-1 grid gap-y-[1.5rem] h-fit gap-x-[1.5rem] grid-cols-2 md:py-10 max-md:mt-5`}
    >
      <div
        className={`col-span-2 xl:col-span-1 relative flex flex-col bg-[#f0f0f080] rounded-lg p-[2rem] h-[245px]`}
      >
        <h1 className={`font-semibold text- border-b-2 border-b-gray-300`}>
          Pregled porudžbenice
        </h1>
        <p className={`mt-2 text-sm`}>
          Broj porudžbenice:{" "}
          <span className={`font-semibold`}>{order?.order?.slug}</span>
        </p>
        <p className={`mt-2 text-sm`}>
          Status porudžbenice:{" "}
          <span className={`font-semibold text-yellow-500`}>Na čekanju</span>
        </p>
      </div>
      <div
        className={`col-span-2 xl:col-span-1 relative flex flex-col bg-[#f0f0f080] rounded-lg p-[2rem] h-[245px]`}
      >
        <h1 className={`font-semibold text- border-b-2 border-b-gray-300`}>
          Podaci o kupcu
        </h1>
        <p className={`mt-2 text-sm`}>
          Ime i prezime: &nbsp;
          <span className={`font-semibold`}>
            {order?.billing_address?.first_name}{" "}
            {order?.billing_address?.last_name}
          </span>
        </p>
        <p className={`mt-2 text-sm`}>
          E-mail:
          <span className={`font-semibold`}>
            {" "}
            {order?.billing_address?.email}
          </span>
        </p>

        <p className={`mt-2 text-sm`}>
          Adresa dostave:
          <span className={`font-semibold`}>
            {" "}
            {order?.shipping_address?.address}{" "}
            {order?.shipping_address?.object_number} ,{" "}
            {order?.shipping_address?.zip_code}
            &nbsp;{order?.shipping_address?.town_name}
          </span>
        </p>
        <p className={`mt-2 text-sm`}>
          Telefon:
          <span className={`font-semibold`}>
            &nbsp;{order?.shipping_address?.phone}
          </span>
        </p>
      </div>
      <div
        className={`col-span-2 xl:col-span-1 relative flex flex-col bg-[#f0f0f080] rounded-lg p-[2rem] h-[245px] overflow-y-auto scrollCustom`}
      >
        <h1 className={`font-semibold text- border-b-2 border-b-gray-300`}>
          Poručeni artikli
        </h1>
        {order?.items?.map((item, itemIndex) => {
          return (
            <Link href={`/${item?.basic_data?.slug}`}>
              <div className={`flex mt-3 items-center gap-10`} key={itemIndex}>
                <div>
                  <Image
                    src={item?.basic_data?.image}
                    alt={``}
                    width={100}
                    height={100}
                  />
                </div>
                <div className={`flex flex-col gap-y-1`}>
                  <h1 className={`text-sm font-semibold`}>
                    {item?.basic_data?.name}
                  </h1>
                  <p className={`text-xs`}>{item?.basic_data?.sku}</p>
                  <p
                    className={`bg-[#f8ce5d] px-2 w-fit text-xs mt-2 font-bold text-center`}
                  >
                    {currencyFormat(item?.price?.total)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div
        className={`col-span-2 xl:col-span-1 relative flex flex-col pb-7 bg-[#f0f0f080] rounded-lg p-[2rem] h-[245px] max-md:mb-5`}
      >
        <h1 className={`font-semibold text- border-b-2 border-b-gray-300`}>
          Podaci o prodavcu
        </h1>
        <p className={`mt-2 text-sm`}>
          Naziv:
          <span className={`font-semibold`}> {process.env.NAME}</span>
        </p>
        <p className={`mt-2 text-sm`}>
          PIB:
          <span className={`font-semibold`}>{process.env.PIB}</span>
        </p>
        <p className={`mt-2 text-sm`}>
          Adresa:
          <span className={`font-semibold`}>{process.env.ADDRESS}</span>
        </p>
      </div>
    </div>
  );
};
