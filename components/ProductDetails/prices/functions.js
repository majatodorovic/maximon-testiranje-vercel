import { currencyFormat } from "@/helpers/functions";

/**
 * Returns
 * status
 * of
 * the
 * price
 * @param {object} price -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {string}
 *     -
 *     The
 *     status
 *     of
 *     the
 *     price.
 */
export const getPriceStatus = (price) => {
  let status = "default";

  if (price?.discount?.active && price?.rebate?.active) {
    status = "discount_rebates";
  }
  if (price?.discount?.active && !price?.rebate?.active) {
    status = "discount";
  }
  if (price?.rebate?.active && !price?.discount?.active) {
    status = "rebates";
  }

  return status;
};

/**
 * Returns
 * are
 * prices
 * equal
 * @param {object} price -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {boolean}
 *     -
 *     Are
 *     prices
 *     equal.
 */
export const getArePricesEqual = (price) => {
  return price?.min?.price?.original === price?.max?.price?.original;
};

/**
 * Returns
 * status
 * of
 * the
 * inventory
 * @param {object} inventory -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     inventory
 *     data.
 * @returns {boolean}
 *     -
 *     The
 *     status
 *     of
 *     the
 *     inventory
 *     -
 *     is
 *     in
 *     stock
 *     or
 *     not.
 */
export const checkIsInStock = (inventory) => {
  return inventory?.inventory_defined && Number(inventory?.amount) > 0;
};

/**
 * Returns
 * status
 * of
 * the
 * inventory
 * @param {object} price -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {object}
 *     -
 *     The
 *     status
 *     of
 *     the
 *     price
 *     -
 *     is
 *     it
 *     defined
 *     and
 *     is
 *     it
 *     the
 *     range
 *     of
 *     prices.
 */
export const checkPrices = (price) => {
  let data = {};

  data.price_defined = !!(price?.price_defined && price?.price?.original > 0);

  data.price_range =
    price?.min?.price?.original > 0 && price?.max?.price?.original > 0;

  return data;
};

/**
 * Returns
 * status
 * of
 * the
 * inventory
 * @param {object} data -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {JSX.Element}
 *     -
 *     Default
 *     prices,
 *     without
 *     rebates
 *     or
 *     discounts.
 */
export const renderDefaultPrices = (data = {}) => {
  let is_range = data?.is_price_range;
  let price = data?.price;

  if (is_range) {
    let are_range_prices_equal = getArePricesEqual(price);
    if (are_range_prices_equal) {
      return (
        <p
          className={`md:!mt-3 !font-bold ${
            data?.is_details ? "!text-xl" : "!text-base"
          }`}
        >
          {currencyFormat(price?.min?.price?.original)}
        </p>
      );
    } else {
      return (
        <p
          className={`md:!mt-3 !font-bold ${
            data?.is_details ? "!text-xl" : "!text-base"
          }`}
        >
          {currencyFormat(price?.min?.price?.original)} -{" "}
          {currencyFormat(price?.max?.price?.original)}
        </p>
      );
    }
  } else {
    return (
      <p
        className={`md:!mt-3 !font-bold ${
          data?.is_details ? "!text-xl" : "!text-base"
        }`}
      >
        {currencyFormat(price?.price?.original)}
      </p>
    );
  }
};

/**
 * Returns
 * status
 * of
 * the
 * inventory
 * @param {object} data -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {JSX.Element}
 *     -
 *     Prices
 *     after
 *     discount.
 */
export const renderDiscountPrices = (data = {}) => {
  let is_range = data?.is_price_range;
  let price = data?.price;

  if (is_range) {
    let are_range_prices_equal = getArePricesEqual(price);

    if (are_range_prices_equal) {
      return (
        <div
          className={`mt-2 flex flex-row flex-wrap items-center gap-3 font-sans`}
        >
          <p className={`font-bold`}>
            {currencyFormat(price?.min?.price?.discount)}
          </p>
          <div className={`line-through text-xs group relative`}>
            {currencyFormat(price?.min?.price?.original)}
            {data?.is_details && (
              <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-[#b89980] text-white p-[6px] rounded absolute -top-12 left-0 text-[10px] font-normal">
                Važeća MP cena
                <svg
                  className="absolute z-50 w-6 h-6 text-[#b89980] transform left-[45%] -translate-x-1/2 -translate-y-[2px] fill-current stroke-current"
                  width="8"
                  height="8"
                >
                  <rect
                    x="12"
                    y="-10"
                    width="8"
                    height="8"
                    transform={"rotate(45)"}
                  />
                </svg>
              </span>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`mt-2 flex flex-row flex-wrap items-center gap-3 font-sans`}
        >
          <p className={`font-bold`}>
            {currencyFormat(price?.min?.price?.discount)} -{" "}
            {currencyFormat(price?.max?.price?.discount)}
          </p>
          <div className={`line-through text-xs group relative`}>
            {currencyFormat(price?.min?.price?.original)} -{" "}
            {currencyFormat(price?.max?.price?.original)}
            {data?.is_details && (
              <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-[#b89980] text-white p-[6px] rounded absolute -top-12 left-0 text-[10px] font-normal">
                Važeća MP cena
                <svg
                  className="absolute z-50 w-6 h-6 text-[#b89980] transform left-[45%] -translate-x-1/2 -translate-y-[2px] fill-current stroke-current"
                  width="8"
                  height="8"
                >
                  <rect
                    x="12"
                    y="-10"
                    width="8"
                    height="8"
                    transform={"rotate(45)"}
                  />
                </svg>
              </span>
            )}
          </div>
        </div>
      );
    }
  } else {
    return (
      <div
        className={`mt-2 flex flex-row flex-wrap items-center gap-3 font-sans`}
      >
        <p className={`font-bold`}>{currencyFormat(price?.price?.discount)}</p>
        <div className={`line-through text-xs group relative`}>
          {currencyFormat(price?.price?.original)}
          {data?.is_details && (
            <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-[#b89980] text-white p-[6px] rounded absolute -top-12 left-0 text-[10px] font-normal">
              Važeća MP cena
              <svg
                className="absolute z-50 w-6 h-6 text-[#b89980] transform left-[45%] -translate-x-1/2 -translate-y-[2px] fill-current stroke-current"
                width="8"
                height="8"
              >
                <rect
                  x="12"
                  y="-10"
                  width="8"
                  height="8"
                  transform={"rotate(45)"}
                />
              </svg>
            </span>
          )}
        </div>
      </div>
    );
  }
};
