"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "@/api/api";

export const Form = ({ fields = [], onChange = () => {}, errors = [] }) => {
  return (fields ?? [])?.map(
    ({ field_name, prop_name, input_type, options, required, fillFromApi }) => {
      switch (input_type) {
        case "select":
          return (
            <Select
              required={required}
              key={field_name}
              name={prop_name}
              field_name={field_name}
              options={options}
              fillFromApi={fillFromApi}
              onChange={onChange}
              errors={errors}
            />
          );
        default:
          return null;
      }
    }
  );
};

export const Select = ({
  options = [],
  name = "",
  required,
  fillFromApi = "",
  field_name = "",
  onChange = (p) => {},
  errors = [],
}) => {
  const { data: ddl_options } = useQuery({
    queryKey: [
      {
        field_name: field_name,
        fillFromApi: fillFromApi,
      },
    ],
    queryFn: async () => {
      return await fetch(`${fillFromApi}`, {
        order_data: {},
        selected_data: {},
        field_options: {
          find_type: "markets_from_countries",
          id_countries: 193,
        },
      }).then((res) => res?.payload);
    },
  });

  const [selected, setSelected] = useState({
    id: null,
    name: null,
  });

  if (ddl_options) {
    const { values } = ddl_options;

    return (
      <div className={`flex flex-col gap-1 mt-2 `}>
        <label htmlFor={name} className={`text-[0.965rem] font-light`}>
          {field_name}
        </label>
        <select
          required={required}
          id={name}
          value={selected?.id}
          className={`w-fit cursor-pointer text-black focus:text-black focus:outline-none focus:ring-0 ${
            errors?.includes("delivery_method_options")
              ? `border border-red-500`
              : ``
          }`}
          name={name}
          onChange={(e) => {
            if (e?.target?.value !== `none`) {
              setSelected({
                id: e?.target?.value,
                name: e.target?.options?.[e?.target?.selectedIndex]?.text,
              });
              onChange({
                value: e?.target?.value,
                prop_name: name,
                selected: {
                  id: e?.target?.value,
                  name: e?.target?.options?.[e?.target?.selectedIndex]?.text,
                },
              });
            }
          }}
        >
          <option value={`none`}>Izaberite radnju</option>
          {(values ?? [])?.map(({ id, name }) => {
            return (
              <option key={id ?? ""} value={id ?? ""} name={name}>
                {name ?? ""}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
  return null;
};

// export const TextInput = ({
//   name = "",
//   required,
//   field_name = "",
//   onChange = (p) => {},
//   errors = [],
// }) => {
//   return (
//     <div className={`flex flex-col gap-1 mt-2 `}>
//       <label htmlFor={name} className={`text-[0.965rem] font-light`}>
//         {field_name}
//       </label>
//       <input
//         required={required}
//         id={name}
//         className={`w-full cursor-pointer text-black focus:text-black focus:outline-none focus:ring-0 ${
//           errors?.includes("delivery_method_options")
//             ? `border border-red-500`
//             : ``
//         }`}
//         name={name}
//         onChange={(e) => {
//           onChange({
//             value: e?.target?.value,
//             prop_name: name,
//             selected: {
//               id: e?.target?.value,
//               name: e?.target?.value,
//             },
//           });
//         }}
//       />
//     </div>
//   );
// };
