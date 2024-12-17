import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetch as FETCH } from "@/api/api";
import { Form, createOptionsArray } from "@/_components/form";
import { useEffect } from "react";

const CheckoutOptions = ({
  formData,
  setFormData,
  className,
  payment_options,
  delivery_options,
  options,
  summary,
  totals,
  errors,
  setErrors,
}) => {
  const queryClient = useQueryClient();
  const { data: delivery_form } = useQuery({
    queryKey: [
      "delivery-option-form",
      {
        delivery_method: formData?.delivery_method,
      },
    ],
    queryFn: async () => {
      return await FETCH(
        `checkout/delivery-option-form/${formData?.delivery_method}`,
        {
          order_data: {},
        }
      ).then((res) => res?.payload);
    },
  });

  const onChange = ({ value, prop_name, selected }) => {
    let data = {};
    if (value) {
      let method_id = formData?.delivery_method;
      let method_name = (delivery_options ?? [])?.find(
        (o) => o?.id === formData?.delivery_method
      )?.name;

      data = {
        delivery_method_id: method_id,
        delivery_method_name: method_name,
        prop_name,
        selected,
      };

      const arr = createOptionsArray(data);
      setErrors(errors?.filter((error) => error !== "delivery_method_options"));
      setFormData({
        ...formData,
        delivery_method_options: arr,
      });
      queryClient.fetchQuery({
        queryKey: ["summary", formData],
        queryFn: async () => {
          return await FETCH(`checkout/summary`, {
            ...formData,
            delivery_method_options: arr,
          }).then((res) => res?.payload);
        },
      });
    }
  };

  return (
    <>
      <div className={`col-span-2 lg:col-span-1`}>
        <div className={`flex flex-col gap-5`}>
          <div className={`bg-[#f7f7f7] p-3`}>
            <h3
              className={`pb-4 text-[0.965rem] font-light ${className} uppercase underline ${
                errors?.includes("delivery_method") ? `text-red-500` : ``
              }`}
            >
              ODABERITE NAČIN DOSTAVE
            </h3>
            {(delivery_options ?? [])?.map(({ id, name }) => {
              return (
                <div className={`flex flex-col gap-2 pl-2.5`} key={id}>
                  <div className={`flex items-center gap-3`} key={id}>
                    <input
                      type={`radio`}
                      className={`cursor-pointer text-black focus:text-black focus:outline-none focus:ring-0`}
                      name={`delivery_method`}
                      id={`delivery_method_${id}`}
                      value={id}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          delivery_method: e.target.value,
                        });
                        setErrors(
                          errors?.filter((error) => error !== "delivery_method")
                        );
                      }}
                    />
                    <label
                      htmlFor={`delivery_method_${id}`}
                      className={`cursor-pointer text-[0.965rem] font-light ${className}`}
                    >
                      {name}
                    </label>
                  </div>
                  {formData?.delivery_method === id &&
                    delivery_form?.status &&
                    delivery_form?.fields?.length > 0 && (
                      <Form
                        errors={errors}
                        fields={delivery_form?.fields}
                        onChange={onChange}
                      />
                    )}
                </div>
              );
            })}
          </div>
          <div className={`bg-[#f7f7f7] p-3`}>
            <h3
              className={`pb-4 text-[0.965rem] font-light ${className} uppercase underline ${
                errors?.includes("payment_method") ? `text-red-500` : ``
              }`}
            >
              ODABERITE NAČIN PLAĆANJA
            </h3>
            {(payment_options ?? [])?.map(({ id, name, type }) => {
              return (
                <div className={`flex items-center gap-3 pl-2.5`} key={id}>
                  <input
                    type={`radio`}
                    className={`cursor-pointer text-black focus:text-black focus:outline-none focus:ring-0`}
                    name={`payment_method`}
                    id={`payment_method_${id}`}
                    value={id}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        payment_method: e.target.value,
                      });
                      setErrors(
                        errors?.filter((error) => error !== "payment_method")
                      );
                    }}
                  />
                  <label
                    htmlFor={`payment_method_${id}`}
                    className={`cursor-pointer text-[0.965rem] font-light ${className}`}
                  >
                    {name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutOptions;
