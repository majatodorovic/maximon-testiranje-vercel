import { currencyFormat } from "@/helpers/functions";

/**
 * Calculates data for a free delivery scale based on cart totals and delivery options.
 *
 * @param {Object} [params={}] - The parameters for the calculation.
 * @param {Object} [params.totals] - The cart totals.
 * @param {number} [params.totals.subtotal] - The subtotal of the cart.
 * @param {number} [params.totals.promo_code] - The cart total after applying promo codes.
 * @param {Object} [params.options] - The delivery options.
 * @param {Object} [params.options.delivery] - The delivery details.
 * @param {Object} [params.options.delivery.free_delivery] - The free delivery configuration.
 * @param {number} [params.options.delivery.free_delivery.amount] - The minimum amount for free delivery.
 * @param {number} [params.options.delivery.free_delivery.percent] - The percentage of progress towards free delivery.
 * @param {number} [params.options.delivery.free_delivery.amount_to_free_delivery] - The amount remaining for free delivery.
 * @returns {Object|undefined} The calculated free delivery scale data or undefined if required parameters are missing.
 * @returns {boolean} [returns.show] - Whether to show the free delivery scale.
 * @returns {number} [returns.percent] - The percentage of progress towards free delivery.
 * @returns {string} [returns.text] - The message to display for free delivery.
 * @returns {boolean} [returns.freeDelivery] - Whether free delivery has been achieved.
 * @returns {string} [returns.remainingCost] - The formatted remaining cost to qualify for free delivery.
 */
const calcFreeDeliveryScaleData = ({ totals, options } = {}) => {
  if (totals && options) {
    const {
      delivery: {
        free_delivery: { amount, percent, amount_to_free_delivery },
      },
    } = options;
    const cartCost = totals?.subtotal ?? totals?.promo_code;
    const data = {
      show: process.env.SHOW_FREE_DELIVERY_SCALE === "true" ? true : false,
      percent:
        percent && amount_to_free_delivery
          ? percent
          : Math.min(Math.round((cartCost / amount) * 100), 100),
      text: "Ostvarili ste besplatnu dostavu",
      freeDelivery: true,
      remainingCost: currencyFormat(
        amount_to_free_delivery ?? amount - cartCost
      ),
    };

    if (data.percent < 100) {
      data.text = "Do besplatne dostave nedostaje ti još";
      data.freeDelivery = false;
    }
    return data;
  }
  return undefined;
};

export default function FreeDeliveryScale({ summary }) {
  const data = calcFreeDeliveryScaleData(summary);
  return (
    <>
      {data?.show && (
        <div className={`py-5`}>
          <div className={`w-full mt-2`}>
            {/*bar for measuring*/}
            <div className="w-full h-1 bg-[#f5f5f7] mt-3">
              <div
                className="h-full relative transition-all duration-500 bg-[#2bc48a]"
                style={{
                  width: `${data?.percent}%`,
                }}
              >
                <div className="absolute top-0 right-0 h-full w-full flex items-center justify-end">
                  <span className="text-black font-bold text-[0.5rem] px-[0.275rem] py-1 bg-white rounded-full border-2 border-[#2bc48a] ">
                    {data?.percent}%
                  </span>
                </div>
              </div>
            </div>
            <h1
              className={`text-base text-[#e10000] mt-4 font-bold ${
                data?.freeDelivery ? "hidden" : ""
              }`}
            >
              {data?.text} {data?.remainingCost}
            </h1>
          </div>
          {data?.freeDelivery && (
            <h1 className="text-base text-[#2bc48a] mt-3 font-bold">
              {data?.text}
            </h1>
          )}
        </div>
      )}
    </>
  );
}
