"use client";

import { useEffect, useState } from "react";
import {
  useCreateAccount,
  useForm,
  useResetPassword,
} from "@/hooks/ecommerce.hooks";
import { handleInputChange, handleSubmit } from "@/_components/shared/form";
import { Form, Input } from "@/_components/shared/form";
import { icons } from "@/_lib/icons";
import fields from "./fields.json";
import { Modal } from "@/_components/shared/modal";

export const CreateAccount = ({ show, handleOpen }) => {
  const { data, setErrors, errors, setData } = useForm({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    gender: "",
    birth_date: "",
    password: "",
    customer_type: "personal",
    company_name: "",
    pib: "",
    maticni_broj: "",
    note: "",
    accept_terms: false,
  });

  const { mutate: createAccount, isPending, isSuccess } = useCreateAccount();

  useEffect(() => {
    if (!show) {
      setData({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        gender: "",
        birth_date: "",
        password: "",
        customer_type: "personal",
        company_name: "",
        pib: "",
        maticni_broj: "",
        note: "",
        accept_terms: false,
      });
      setErrors([]);
    }
  }, [show]);

  useEffect(() => {
    if (isSuccess) {
      handleOpen();
      setData({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        gender: "",
        birth_date: "",
        password: "",
        customer_type: "personal",
        company_name: "",
        pib: "",
        maticni_broj: "",
        note: "",
        accept_terms: false,
      });
    }
  }, [isSuccess]);

  return (
    <Modal
      className={`grid grid-cols-2 gap-x-5`}
      isPending={isPending}
      handleSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e, data, setData, createAccount, fields, setErrors);
      }}
      handleInputChange={(e) => {
        handleInputChange(e, setData, setErrors);
      }}
      fields={fields}
      errors={errors}
      data={data}
      showOptions={false}
      setData={setData}
      handleOpen={handleOpen}
      setErrors={setErrors}
      show={show}
      button_text={"Napravite nalog"}
      title={"Napravite nalog"}
      description={
        "Popunite formu ispod kako biste napravili nalog. Nakon što popunite formu, na email adresu koju ste uneli će vam biti poslat link za  potvrdu naloga."
      }
    />
  );
};
