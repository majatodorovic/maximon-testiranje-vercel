"use client";

import { useEffect, useState } from "react";
import { useForm, useResetPassword } from "@/hooks/ecommerce.hooks";
import { handleInputChange, handleSubmit } from "@/_components/shared/form";
import { Form, Input } from "@/_components/shared/form";
import { icons } from "@/_lib/icons";
import fields from "./fields.json";
import { Modal } from "@/_components/shared/modal";

export const ResetPassword = ({ show, handleOpen }) => {
  const { data, setErrors, errors, setData } = useForm({
    email: "",
  });

  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();

  useEffect(() => {
    if (isSuccess) {
      handleOpen();
      setData({
        email: "",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!show) {
      setData({
        email: "",
      });
      setErrors([]);
    }
  }, [show]);

  return (
    <Modal
      isPending={isPending}
      handleSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e, data, setData, resetPassword, fields, setErrors);
      }}
      fields={fields}
      handleInputChange={(e) => {
        handleInputChange(e, setData, setErrors);
      }}
      errors={errors}
      data={data}
      showOptions={false}
      setData={setData}
      handleOpen={handleOpen}
      setErrors={setErrors}
      show={show}
      description={
        "Da biste resetovali lozinku, unesite email adresu koju koristite za prijavu na nalog. Na tu email adresu će vam biti poslat link za resetovanje lozinke."
      }
      button_text={"Resetujte lozinku"}
      title={"Resetujte lozinku"}
    />
  );
};
