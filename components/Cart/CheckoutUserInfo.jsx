import Input from "@/components/Input";
import CheckoutItems from "@/components/Cart/CheckoutItems";
import { Suspense } from "react";
import {
  Form,
  handleInputChange,
  handleSubmit,
} from "@/_components/shared/form";
import billing from "./billing.json";

const CheckoutUserInfo = ({
  className,
  selected,
  formData,
  setFormData,
  items,
  refreshCart,
  errors,
  setErrors,
  refreshSummary,
}) => {
  const onChange = (e, use_same_data, setFormData, setErrors) => {
    switch (true) {
      case use_same_data:
        const { value: typed_value, name } = e?.target;
        Object?.entries(formData)?.forEach(([key, value]) => {
          if (name?.includes("billing")) {
            let shipping_key = name?.replace("billing", "shipping");
            setFormData((prev) => ({
              ...prev,
              [name]: typed_value,
              [shipping_key]: typed_value,
            }));
          }
        });
        setErrors((prev) => prev.filter((error) => error !== name));

        break;
      case !use_same_data:
        return handleInputChange(e, setFormData, setErrors);
    }
  };

  return (
    <div className={`col-span-2 flex w-full flex-col gap-5 lg:col-span-1`}>
      <Form
        className={`grid grid-cols-2 gap-x-5`}
        errors={errors}
        data={formData}
        handleInputChange={(e) => {
          onChange(e, selected?.use_same_data, setFormData, setErrors);
        }}
        buttonClassName={`!hidden`}
        handleSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e, formData, setFormData, () => {}, billing, setErrors);
        }}
        fields={billing}
        showOptions={false}
        isPending={false}
      />
    </div>
  );
};

export default CheckoutUserInfo;
