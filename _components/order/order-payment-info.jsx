"use client";
import Image from "next/image";
import {
  handlePaymentType,
  handlePaymentStatus,
  handlePaymentText,
} from "./functions";

export const OrderPaymentInfo = ({ order }) => {
  const { payments } = order;

  const payment_type = handlePaymentType(payments);
  const payment_status = handlePaymentStatus(payments, payment_type);

  const {
    image,
    subtitle,
    payment_info,
    text_line_1,
    text_line_2,
    title,
    button,
  } = handlePaymentText(
    payment_type,
    payment_status?.[payment_type]?.["status_info"],
    payment_status?.[payment_type]?.["fields"]
  );

  return (
    <div className="flex flex-col items-center gap-4 lg:p-[3.5rem] bg-[#f0f0f080] rounded-md col-span-2 md:col-span-1">
      {image && (
        <Image
          src={image}
          width={200}
          height={100}
          alt={`${process.env.NAME}`}
        />
      )}

      <div className="flex flex-col items-center gap-4">
        {title && (
          <h3 className="font-semibold text-2xl text-center">{title}</h3>
        )}
        {subtitle && <p className="text-center">{subtitle}</p>}
      </div>
      <div className="flex flex-col items-center gap-4">
        {text_line_1 && <p className="text-center">{text_line_1}</p>}
      </div>
      {payment_info && (
        <div className="flex flex-col items-center">
          {payment_info?.title && (
            <h3
              className={`text-lg text-center ${
                payment_info?.status === "success"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {payment_info?.title}
            </h3>
          )}
          {payment_info?.description && (
            <p className="text-base text-center mt-3">
              {payment_info?.description}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        {text_line_2 && <p className="text-center text-base">{text_line_2}</p>}
      </div>

      {payment_info?.fields && (
        <div className={`flex flex-col items-center !text-sm`}>
          {payment_info?.fields_title && (
            <h4 className="text-sm mt-3 text-center">
              {payment_info?.fields_title}
            </h4>
          )}
          {(payment_info?.fields ?? [])?.map(({ label, value }) => {
            if (label !== "Banka") {
              return (
                <div
                  className={`flex items-center gap-2`}
                  key={`${label}-${value}`}
                >
                  <p>{label}:</p>
                  <p>{value}</p>
                </div>
              );
            }
          })}
        </div>
      )}

      {button && (
        <a href="/">
          <button className="bg-[#2bc48a] mt-10 px-10 font-medium text-white hover:bg-opacity-80 py-4">
            {button}
          </button>
        </a>
      )}
    </div>
  );
};
