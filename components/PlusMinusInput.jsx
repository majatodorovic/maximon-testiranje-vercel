"use client";

import { useEffect, useId, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "@mui/material";
import { useCart } from "@/hooks/ecommerce.hooks";
import { useIsFetching } from "@tanstack/react-query";

const quantityInputStyle = {
  error: "focus:border-red-600 border-transparent",
  default: "focus:border-black border-transparent",
};

const PlusMinusInput = ({
  quantity,
  maxAmount,
  setQuantity,
  updateCart,
  id,
  updatingCart,
  updatingCartError,
}) => {
  const { isFetching: isFetchingCart } = useCart();
  const isFetchingSummary = useIsFetching({ queryKey: ["summary"] });
  const [showInputErrorToolTip, setShowInputErrorTooltip] = useState(false);
  const previousQuantity = useRef(quantity);

  const quantityErrorMessageId = useId();
  const showQuantitiyError = () => {
    if (!toast.isActive(quantityErrorMessageId)) {
      toast.error(`Na lageru trenutno nema željena količina artikala.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: quantityErrorMessageId,
      });
    }
  };

  const onPlus = () => {
    if (!isFetchingCart && !isFetchingSummary && !updatingCart) {
      // if (quantity < maxAmount) {
      // setQuantity(quantity + 1);
      updateCart({
        id: id,
        quantity: quantity + 1,
        message: `Uspešno izmenjena količina.`,
        type: true,
      });
      // } else {
      //   showQuantitiyError();
      // }
    }
  };

  const onQuantityInputChange = (e) => {
    if (!isFetchingCart && !isFetchingSummary && !updatingCart) {
      const inputValue = e?.target?.value
        ?.replace(/[^0-9.]/g, "")
        .replace(/^0+/, "");

      if (Number(inputValue) === previousQuantity.current) {
        setQuantity(Number(inputValue));
      }
      if (inputValue) {
        updateCart({
          id: id,
          quantity: inputValue,
          message: `Uspešno izmenjena količina.`,
        });
        // previousQuantity.current = Number(inputValue);
        setShowInputErrorTooltip(false);
      } else {
        setQuantity("");
        setShowInputErrorTooltip(true);
      }
    }
  };

  const onQuantityInputBlur = (e) => {
    if (!isFetchingCart && !isFetchingSummary && !updatingCart) {
      const inputValue = e?.target?.value;
      setShowInputErrorTooltip(false);
      if (inputValue === "") {
        setQuantity(previousQuantity.current);
        updateCart({
          id: id,
          quantity: previousQuantity.current,
          message: `Uspešno izmenjena količina.`,
        });
      }
    }
  };

  const onMinus = () => {
    if (!isFetchingCart && !isFetchingSummary && !updatingCart) {
      if (quantity > 1) {
        // setQuantity(quantity - 1);
        updateCart({
          id: id,
          quantity: quantity - 1,
          message: `Uspešno izmenjena količina.`,
          type: true,
        });
      }
    }
  };

  useEffect(() => {
    if (updatingCartError) {
      updateCart({
        id: id,
        quantity: maxAmount,
        message: `Uspešno izmenjena količina.`,
        type: true,
      });
      showQuantitiyError();
    }
  }, [updatingCartError, maxAmount]);

  useEffect(() => {
    if (quantity !== "") {
      previousQuantity.current = quantity;
    }
  }, [quantity]);

  return (
    <div className={`flex w-28 items-stretch rounded-md bg-[#f7f7f7]`}>
      <button
        className={`cursor-pointer text-[0.9rem] flex items-center justify-center w-8 shrink-0`}
        onClick={onMinus}
      >
        <span>-</span>
      </button>
      <Tooltip
        title={"Unesite broj koji je veći od 0"}
        arrow
        open={showInputErrorToolTip}
      >
        <input
          type={`text`}
          className={`w-full ${
            quantityInputStyle[showInputErrorToolTip ? "error" : "default"]
          } bg-inherit text-center border-[1px] py-1 px-1 text-[0.9rem] font-normal focus:outline-none focus:ring-0`}
          value={quantity}
          onChange={onQuantityInputChange}
          onBlur={onQuantityInputBlur}
        />
      </Tooltip>
      <button
        className={`cursor-pointer text-[0.9rem] flex items-center justify-center w-8 shrink-0`}
        onClick={onPlus}
      >
        <span>+</span>
      </button>
    </div>
  );
};

export default PlusMinusInput;
