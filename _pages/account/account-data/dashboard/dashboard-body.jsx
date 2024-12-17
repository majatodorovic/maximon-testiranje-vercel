import buttons from "./buttons.json";
import { useTabChange } from "@/_pages/account/sidebar";

export const DashboardBody = () => {
  const handleTabChange = useTabChange();
  let btns = buttons;
  let show_shipping_options = process.env.SHOW_CHECKOUT_SHIPPING_FORM;

  if (show_shipping_options === "false") {
    btns = buttons?.filter((button) => button.tab !== "shipping");
  }
  return (
    <div className={`mt-5`}>
      <h2 className={`text-lg`}>Predložene akcije</h2>
      <div className={`flex items-center flex-wrap gap-3 mt-3`}>
        {(btns ?? [])?.map(({ id, tab, title }) => {
          return (
            <button
              onClick={() => handleTabChange(tab)}
              key={id}
              className={`bg-gray-100 w-fit text-gray-700 border border-transparent hover:bg-gray-200 hover:border-gray-300 rounded-lg p-2 text-sm`}
            >
              {title}
            </button>
          );
        })}
      </div>
    </div>
  );
};
