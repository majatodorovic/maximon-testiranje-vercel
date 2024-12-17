"use client";

import { SectionHeader } from "@/_pages/account/account-data/shared/section-header";
import {
  useDeleteAccountData,
  useForm,
  useGetAccountData,
  useUpdateAccountData,
} from "@/hooks/ecommerce.hooks";
import { Modal } from "@/_components/shared/modal";
import { useEffect, useState } from "react";
import { handleInputChange, handleSubmit } from "@/_components/shared/form";
import fields from "./fields.json";
import tableFields from "./tableFields.json";
import { Table } from "@/_pages/account/account-data/shared";
import { useRouter } from "next/navigation";
import { SectionBody } from "@/_pages/account/account-data/shared/section-body";

export const Shippings = () => {
  const { data: shipping_addresses, refetch } = useGetAccountData(
    `/customers/shipping-address`,
    "list"
  );

  const { data: new_address } = useGetAccountData(
    `/customers/shipping-address/new`,
    "get"
  );

  const {
    mutate: addNewAddress,
    isPending,
    isSuccess: isAdded,
  } = useUpdateAccountData(
    `/customers/shipping-address`,
    `Uspešno ste dodali novu adresu dostave.`
  );

  const { mutate: deleteAddress, isSuccess: isDeleted } = useDeleteAccountData(
    `/customers/shipping-address`,
    `customers/shipping-address`,
    `Uspešno ste obrisali adresu dostave.`
  );

  const { data, setData, errors, setErrors } = useForm({
    ...new_address,
    set_default: false,
  });

  const [show, setShow] = useState({
    show: false,
    button: "Dodajte novu adresu",
    title: "Dodajte novu adresu",
    description: "Popunjavajem forme ispod možete dodati novu adresu dostave.",
  });

  const formatFields = (fields, data) => {
    if (data && Number(data?.id_country) === 193) {
      return fields?.map((field) => {
        if (field?.name === "town_name") {
          return {
            ...field,
            name: "id_town",
            type: "select",
            fill: `/customers/shipping-address/ddl/id_town?id_country=${data?.id_country}`,
          };
        }
        return field;
      });
    }
    return fields;
  };

  useEffect(() => {
    if (isAdded || isDeleted) {
      setShow({
        ...show,
        show: false,
      });
      setData({
        ...new_address,
        set_default: false,
      });
      refetch();
    }
  }, [isAdded, isDeleted]);

  return (
    <>
      <SectionHeader
        title={"Adrese dostave"}
        description={"Ovde možete videti sve vaše adrese dostave."}
        icon={`plus`}
        button={`Dodajte novu adresu`}
        onClick={() => {
          setData({
            ...data,
            id_country: 0, //set Default to Izaberi
          })
          setShow({
            ...show,
            show: true,
          });
        }}
      />
      <SectionBody>
        <Table
          data={shipping_addresses}
          fields={tableFields}
          onClick={(action, row) => {
            if (action === "edit") {
              setData(row);
              setShow({
                title: "Izmenite adresu",
                button: "Izmenite adresu",
                description: `Popunjavajem forme ispod možete izmeniti adresu dostave.`,
                show: true,
              });
            } else {
              deleteAddress(row);
            }
          }}
        />
      </SectionBody>
      <Modal
        data={data}
        errors={errors}
        fields={formatFields(fields, data)}
        isPending={isPending}
        setData={setData}
        handleOpen={() =>
          setShow({
            ...show,
            show: !show.show,
          })
        }
        show={show?.show}
        className={`grid grid-cols-2 gap-x-5`}
        setErrors={setErrors}
        showOptions={false}
        handleInputChange={(e) => {
          handleInputChange(e, setData, setErrors);
        }}
        handleSubmit={(e) => {
          
          handleSubmit(
            e,
            data,
            setData,
            addNewAddress,
            formatFields(fields, data),
            setErrors
          );
        }}
        button_text={show?.button}
        title={show?.title}
        description={
          show?.description
            ? show?.description
            : `Popunjavajem forme ispod možete dodati novu adresu dostave.`
        }
      />
    </>
  );
};
