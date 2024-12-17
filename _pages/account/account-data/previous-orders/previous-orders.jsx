"use client";

import { SectionHeader } from "@/_pages/account/account-data/shared/section-header";
import { useGetAccountData } from "@/hooks/ecommerce.hooks";
import { Table } from "@/_pages/account/account-data/shared";
import { Modal } from "@/_components/shared/modal";
import { useState } from "react";
import { currencyFormat } from "@/helpers/functions";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import tableFields from "./tableFields.json";
import { SectionBody } from "@/_pages/account/account-data/shared/section-body";

export const PreviousOrders = () => {
  const { data: previous_orders, refetch } = useGetAccountData(
    `/customers/previous-orders`,
    "list"
  );

  const [show, setShow] = useState({
    show: false,
    order_token: null,
  });

  return (
    <>
      <SectionHeader
        title={"Prethodne kupovine"}
        description={"Ovde možete videti sve vaše prethodne kupovine."}
      />
      <SectionBody>
        <Table
          data={previous_orders}
          fields={tableFields}
          onClick={(_, row) => {
            setShow({
              show: true,
              order_token: row?.order_token,
            });
          }}
        />
      </SectionBody>
      <Modal
        type={`modal`}
        show={show?.show}
        handleOpen={() =>
          setShow({
            show: false,
            order_token: null,
          })
        }
        description={`Ovo su detalji vaše porudžbenice.`}
        title={`Detalji porudžbenice`}
        children={<ModalChildren order_token={show.order_token} />}
      />
    </>
  );
};

const ModalChildren = ({ order_token }) => {
  const { data } = useGetAccountData(
    `/customers/previous-orders/${order_token}`,
    "get"
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("sr-RS");
  };

  if (data) {
    const { order, items } = data;
    return (
      <div className="p-6 bg-white mt-5 rounded-lg shadow max-w-lg mx-auto">
        <h1 className="text-xl font-medium mb-4">
          Porudžbenica: {order?.slug}
        </h1>
        <p className="text-gray-700 mb-2">
          Kreirana: {formatDate(order?.created_at)}
        </p>
        <p className="text-gray-700 mb-2">
          Način dostave: {order?.delivery_method_name}
        </p>
        <p className="text-gray-700 mb-4">
          Način plaćanja: {order?.payment_method_name}
        </p>

        <ul className="space-y-4">
          {(items ?? [])?.map(
            ({
              basic_data: { id, name, quantity, image },
              price: { total },
            }) => {
              return (
                <li
                  key={id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4"
                >
                  <div className="w-24 h-24 overflow-hidden rounded-lg flex-shrink-0">
                    <Image
                      src={convertHttpToHttps(image ?? "")}
                      alt={name ?? "product"}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Naziv: {name}</p>
                    <p className="text-gray-600">
                      Cena: {currencyFormat(total)}
                    </p>
                    <p className="text-gray-600">Količina: {quantity}</p>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  }
};
