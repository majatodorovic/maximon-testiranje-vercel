"use client";
import {
  checkIsInStock,
  checkPrices,
  getPriceStatus,
  renderDefaultPrices,
  renderDiscountPrices,
} from "@/components/ProductDetails/prices/functions";

const ProductPrice = ({ price, inventory, is_details = false }) => {
  let status = getPriceStatus(price);
  let is_in_stock = checkIsInStock(inventory);
  let prices = checkPrices(price);

  let data = {
    status: status,
    is_in_stock: is_in_stock,
    price_defined: prices?.price_defined,
    is_price_range: prices?.price_range,
    price: price,
    is_details: is_details,
  };

  if (!data?.is_in_stock || !data.price_defined) {
    return <p className={`md:mt-3 font-bold`}>Cena na upit</p>;
  }

  switch (data?.status) {
    case "default":
      return renderDefaultPrices({ ...data });
    case "discount":
      return renderDiscountPrices({ ...data });
  }
};

export default ProductPrice;
