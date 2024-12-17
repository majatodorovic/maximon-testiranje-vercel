import { currencyFormat } from "@/helpers/functions";

const CheckoutTotals = ({ className, options, totals, summary, formData }) => {
  return (
    <div className={`flex flex-col pl-2`}>
      <div className={`flex items-center justify-between py-2`}>
        <p className={`${className} text-[0.965rem] font-normal`}>
          Ukupna vrednost Vaše korpe:
        </p>
        <p className={`${className} text-[1rem] font-light`}>
          {currencyFormat(totals?.with_vat)}
        </p>
      </div>
      <div
        className={`flex items-center justify-between border-t border-t-white py-2`}
      >
        <p className={`${className} text-[0.965rem] font-normal`}>
          Iznos ostvarenog popusta:
        </p>
        <p className={`${className} text-[1rem] font-light`}>
          {totals?.items_discount_amount + totals?.cart_discount_amount > 0 && (
            <span>-</span>
          )}
          {currencyFormat(
            totals?.items_discount_amount + totals?.cart_discount_amount
          )}
        </p>
      </div>
      <div
        className={`flex items-center justify-between border-t border-t-white py-2`}
      >
        <p className={`${className} text-[0.965rem] font-normal`}>
          Vrednost korpe sa popustom:
        </p>
        <p className={`${className} text-[1rem] font-light`}>
          {currencyFormat(totals?.cart_discount)}
        </p>
      </div>
      {totals?.promo_code_amount > 0 && (
        <div
          className={`flex items-center justify-between border-t border-t-white py-2`}
        >
          <p className={`${className} text-[0.965rem] font-normal`}>
            Iznos promo koda:
          </p>
          <p className={`${className} text-[1rem] font-light`}>
            -{currencyFormat(totals?.promo_code_amount)}
          </p>
        </div>
      )}
      <div
        className={`flex items-center justify-between border-t border-t-white py-2`}
      >
        <p className={`${className} text-[0.965rem] font-normal`}>
          Iznos koštanja dostave:
        </p>
        <p className={`${className} text-[1rem] font-light`}>
          {currencyFormat(totals?.delivery_amount)}
        </p>
      </div>
      <div
        className={`flex items-center justify-between border-t border-t-white py-2`}
      >
        <p className={`${className} text-[0.965rem] font-normal`}>
          Ukupno za plaćanje:
        </p>
        <p className={`${className} text-[1rem] font-medium`}>
          {currencyFormat(totals?.total)}
        </p>
      </div>
    </div>
  );
};

export default CheckoutTotals;
