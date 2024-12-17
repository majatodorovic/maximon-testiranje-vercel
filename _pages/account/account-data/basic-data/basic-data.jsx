"use client";

import {
  useForm,
  useGetAccountData,
  useUpdateAccountData,
} from "@/hooks/ecommerce.hooks";
import {
  Form,
  handleInputChange,
  handleSubmit,
} from "@/_components/shared/form";
import fields from "./fields.json";
import { SectionHeader } from "@/_pages/account/account-data/shared/section-header";
import { SectionBody } from "@/_pages/account/account-data/shared/section-body";

export const AccountBasicData = () => {
  const { data: basic_data } = useGetAccountData(`/customers/profile`);
  const { mutate: updateBasicData, isPending } =
    useUpdateAccountData(`/customers/profile`);
  const { data, setErrors, setData, errors } = useForm(basic_data);

  return (
    <>
      <SectionHeader
        title={"Osnovne informacije"}
        description={
          "Ovde možete promeniti osnovne informacije o vašem nalogu."
        }
      />
      <SectionBody>
        <Form
          className={`grid grid-cols-2 gap-x-5`}
          data={data}
          fields={fields}
          showOptions={false}
          errors={errors}
          isPending={isPending}
          button_text={"Sačuvaj izmene"}
          handleInputChange={(e) => {
            handleInputChange(e, setData, setErrors);
          }}
          handleSubmit={(e) => {
            handleSubmit(e, data, setData, updateBasicData, fields, setErrors);
          }}
        />
      </SectionBody>
    </>
  );
};
