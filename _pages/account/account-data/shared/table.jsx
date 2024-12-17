"use client";

import { icons } from "@/_lib/icons";

export const Table = ({ fields, data, onClick }) => {
  const handleTableCellText = (field, row) => {
    switch (field?.name) {
      case "set_default":
        return Number(row?.[field?.name]) === 1 ? "Da" : "Ne";
      default:
        return row?.[field?.name];
    }
  };

  return (
    <div className="overflow-auto shadow rounded-lg mt-10">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-300 text-black">
            {(fields ?? [])?.map((field) => (
              <th
                key={`head-${field?.id}`}
                className="px-4 text-sm font-normal py-2 border-b"
              >
                {field?.placeholder}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(data ?? [])?.map((row, index) => {
            return (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "!bg-gray-50" : "bg-white"}`}
              >
                {(fields ?? [])?.map((field) => (
                  <td
                    key={`body-${field?.id}`}
                    className="px-4 py-2 border-b text-center text-sm"
                  >
                    {field?.name !== "actions"
                      ? handleTableCellText(field, row)
                      : Actions(field?.actions, row, onClick)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Actions = (actions, row, onClick) => {
  let all_actions = (actions ?? "-").split("-");

  return (
    <div
      colSpan={all_actions?.length}
      className="text-right py-4 flex items-center gap-2 justify-end"
    >
      {(all_actions ?? [])?.map((action, index) => {
        return (
          <button
            onClick={() => {
              onClick(action, row);
            }}
            key={index}
            className={`${
              action?.color ?? "text-black"
            } hover:underline hover:text-blue- w-[1.3rem]`}
          >
            {icons?.[action]}
          </button>
        );
      })}
    </div>
  );
};
