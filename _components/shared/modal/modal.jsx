"use client";

import { icons } from "@/_lib/icons";
import { Form } from "@/_components/shared/form";
import { handleOpen } from "@/_pages/login/functions";

export const Modal = ({
  show,
  handleOpen,
  errors,
  setErrors,
  data,
  setData,
  showOptions,
  handleSubmit,
  handleInputChange,
  fields,
  isPending,
  className,
  button_text,
  title,
  description,
  type = "form",
  children,
}) => {
  switch (type) {
    case "form":
      return (
        <>
          <div
            className={
              show
                ? `fixed bottom-0 right-0 top-0 left-0 max-sm:w-[95%] w-full max-w-xl rounded-lg h-fit m-auto max-h-[80%] overflow-y-auto z-[2002] bg-white p-5`
                : `hidden`
            }
          >
            <div className={`flex items-center justify-between`}>
              <h3 className={`text-xl`}>{title}</h3>
              <span
                className={`w-[1.5rem] hover:text-red-500 cursor-pointer`}
                onClick={handleOpen}
              >
                {icons.close}
              </span>
            </div>
            <p className={`text-sm mt-2 text-gray-500`}>{description}</p>
            <Form
              className={`${className}`}
              errors={errors}
              data={data}
              showOptions={false}
              setData={setData}
              handleSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              fields={fields}
              handleInputChange={(e) => {
                handleInputChange(e);
              }}
              isPending={isPending}
              button_text={button_text}
            />
          </div>
          <div
            onClick={() => {
              handleOpen();
            }}
            className={
              show
                ? `fixed top-0 left-0 bg-black/70 h-[100dvh] w-[100dvw] z-[2001]`
                : ``
            }
          />
        </>
      );
    default:
      return (
        <>
          <div
            className={
              show
                ? `fixed bottom-0 right-0 top-0 left-0 max-sm:w-[95%] w-full max-w-xl rounded-lg h-fit m-auto z-[2002] bg-white p-5`
                : `hidden`
            }
          >
            <div className={`flex items-center justify-between`}>
              <h3 className={`text-xl`}>{title}</h3>
              <span
                className={`w-[1.5rem] hover:text-red-500 cursor-pointer`}
                onClick={handleOpen}
              >
                {icons.close}
              </span>
            </div>
            <p className={`text-sm mt-2 text-gray-500`}>{description}</p>
            {children}
          </div>
          <div
            onClick={() => {
              handleOpen();
            }}
            className={
              show
                ? `fixed top-0 left-0 bg-black/70 h-[100dvh] w-[100dvw] z-[2001]`
                : ``
            }
          />
        </>
      );
  }
};
