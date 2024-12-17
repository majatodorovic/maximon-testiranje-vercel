"use client";

import { SectionHeader } from "@/_pages/account/account-data/shared";
import { useForm, useUpdateAccountData } from "@/hooks/ecommerce.hooks";
import {
  Form,
  handleInputChange,
  handleSubmit,
} from "@/_components/shared/form";
import fields from "./fields.json";
import { SectionBody } from "@/_pages/account/account-data/shared/section-body";

export const PasswordChange = () => {
  const { data, setData, errors, setErrors } = useForm({
    password: "",
    sent_mail: false,
  });

  const { mutate, isPending } = useUpdateAccountData(
    `/customers/profile/reset-password`,
    `Uspešno ste promenili lozinku.`
  );

  return (
    <>
      <SectionHeader
        title={"Izmena lozinke"}
        description={
          "Ovde možete promeniti lozinku. Nakon što unesete novu lozinku, biće vam poslat email sa potvrdom."
        }
      />
      <SectionBody>
        <Form
          className={`grid grid-cols-2 gap-x-5`}
          data={data}
          buttonClassName={"!w-fit"}
          fields={fields}
          showOptions={false}
          errors={errors}
          isPending={isPending}
          button_text={"Potvrdi"}
          handleInputChange={(e) => {
            handleInputChange(e, setData, setErrors);
          }}
          handleSubmit={(e) => {
            handleSubmit(e, data, setData, mutate, fields, setErrors);
          }}
        />
      </SectionBody>
    </>
  );
};
