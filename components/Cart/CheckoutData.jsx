"use client";

import { Suspense, useContext, useEffect, useState } from "react";
import {
  useBillingAddresses,
  useCheckout,
  useForm,
  useGetAddress,
  useIsLoggedIn,
  useRemoveFromCart,
  useGetAccountData,
} from "@/hooks/ecommerce.hooks";
import { handleCreditCard, handleSetData } from "@/components/Cart/functions";
import { useRouter } from "next/navigation";
import { PromoCode } from "@/components/Cart/PromoCode";
import {
  CheckboxInput,
  Form,
  handleResetErrors,
  SelectInput,
  handleInputChange,
} from "@/_components/shared/form";
import Image from "next/image";
import CheckoutUserInfo from "@/components/Cart/CheckoutUserInfo";
import CheckoutOptions from "@/components/Cart/CheckoutOptions";
import CheckoutTotals from "@/components/Cart/CheckoutTotals";
import CheckoutItems from "@/components/Cart/CheckoutItems";
import Link from "next/link";
import fields from "./shipping.json";
import Cookies from "js-cookie";
import Spinner from "@/components/UI/Spinner";
import { userContext } from "@/context/userContext";

import FreeDeliveryScale from "./FreeDeliveryScale";

export const CheckoutData = ({
  className,
  formData,
  setFormData,
  payment_options,
  delivery_options,
  summary,
  items,
  options,
  totals,
  refreshCart,
  refreshSummary,
}) => {
  const {
    data: dataTmp,
    setData: setDataTmp,
    errors: errorsTmp,
    setErrors: setErrorsTmp,
  } = useForm(formData);

  const [selected, setSelected] = useState({
    id: null,
    use_same_data: true,
  });

  const { loggedIn: userLoggedIn } = useContext(userContext);

  const { data: loggedIn } = useIsLoggedIn();

  const { data: billing_addresses } = userLoggedIn ? useBillingAddresses() : [];

  const { data: user_billing_addresses } = userLoggedIn
    ? useGetAccountData(`/customers/billing-address`, "list")
    : [];

  const { data: form, isLoading } = useGetAddress(
    billing_addresses?.length > 1 && selected?.id
      ? selected?.id
      : billing_addresses?.[0]?.id,
    "billing",
    loggedIn && Boolean(billing_addresses?.length)
  );

  const [postErrors, setPostErrors] = useState({
    fields: [],
  });

  const [isClosed, setIsClosed] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data,
    mutate: checkOut,
    isPending,
    isSuccess: isCheckoutSuccess,
    status,
  } = useCheckout({
    formData: dataTmp,
    setPostErrors: setPostErrors,
    setLoading: setLoading,
  });

  const [required, setRequired] = useState([
    "payment_method",
    "delivery_method",
    "first_name_shipping",
    "last_name_shipping",
    "phone_shipping",
    "email_shipping",
    "address_shipping",
    "town_name_shipping",
    "zip_code_shipping",
    "object_number_shipping",
    "accept_rules",
    "first_name_billing",
    "last_name_billing",
    "phone_billing",
    "email_billing",
    "address_billing",
    "town_name_billing",
    "zip_code_billing",
    "object_number_billing",
  ]);

  useEffect(() => {
    if (formData?.delivery_method === "in_store_pickup") {
      setRequired((prevRequired) => [
        ...prevRequired,
        "delivery_method_options",
      ]);
    } else {
      setRequired((prevRequired) =>
        prevRequired.filter((item) => item !== "delivery_method_options")
      );
    }
  }, [formData?.delivery_method]);

  useEffect(() => {
    const defaultAddress = user_billing_addresses?.find(
      (address) => address.set_default === 1
    );
    if (defaultAddress) {
      const { id: billing_id } = defaultAddress;
      setSelected((prev) => ({
        ...prev,
        id: billing_id,
      }));
    }
  }, [user_billing_addresses]);

  const router = useRouter();

  //Function to switch api use of country depending on user logged in status
  const formatCountry = (fields)  =>{
    fields.map(field => {
      if(field.name === 'id_country_shipping') {
        return {
          ...field,fill: userLoggedIn ? `/customers/shipping-address/ddl/id_country`: `checkout/ddl/id_country`
        }
      }
    })
  }
  //Function to switch field from input to select and changing api depending on user logged in status
  const formatCheckoutFields = (fields, data) => {
    if (data && Number(data?.id_country_shipping) === 193) {
      return fields
        ?.map((field) => {
          if (field?.name === "town_name_shipping") {
            return {
              ...field,
              name: "id_town_shipping",
              type: "select",
              fill:userLoggedIn ? '/customers/shipping-address/ddl/id_town?id_country=${data?.id_country}' : `checkout/ddl/id_town?id_country=${data?.id_country_shipping}`,
            };
          }
          return field;
        })
        .filter(Boolean); // Remove null fields from the array
    }
    return fields;
  };

  const filterOutProductsOutOfStock = (data) => {
    const productsOutOfStock = [];
    data?.forEach((item) => {
      if (!item?.product?.inventory?.inventory_defined) {
        productsOutOfStock.push({
          cart: {
            id: null,
            item_id: null,
          },
          product: {
            name: item?.product?.basic_data?.name,
            sku: item?.product?.basic_data?.sku,
            slug: item?.product?.slug,
            image: item?.product?.image,
            id: item?.product?.id,
          },
        });
      }
    });
    setPostErrors((prevErrors) => ({
      ...prevErrors,
      fields: productsOutOfStock,
    }));
  };

  useEffect(() => {
    if (items && !isClosed) {
      filterOutProductsOutOfStock(items);
    }
  }, [items]);

  const { mutate: removeFromCart, isSuccess } = useRemoveFromCart();

  useEffect(() => {
    if (isSuccess) {
      refreshCart();
      refreshSummary();
    }
  }, [isSuccess, refreshCart, refreshSummary]);

  useEffect(() => {
    if (isCheckoutSuccess && data) {
      const { credit_card } = data;
      switch (true) {
        case credit_card === null:
          return router.push(`/korpa/kupovina/${data?.order?.order_token}`);
        case credit_card !== null:
          return handleCreditCard(data);
        default:
          break;
      }
    }
  }, [isCheckoutSuccess, data, router]);

  useEffect(
    () => {
      if (!isLoading) {
        handleSetData("default_data", form, dataTmp, setDataTmp);
      }
    },
    [selected?.id, form?.[0]],
    isLoading
  );

  useEffect(() => {
    formatCountry(fields);
    if (selected?.use_same_data) {
      return handleSetData("same_data", form, dataTmp, setDataTmp);
    } else {
      
      return handleSetData("different_data", form, dataTmp, setDataTmp);
    }
  }, [selected?.id, selected?.use_same_data]);

  useEffect(() => {
    setRequired((prevRequired) =>
      selected?.use_same_data
        ? prevRequired.filter(
            (item) =>
              item !== "floor_shipping" && item !== "apartment_number_shipping"
          )
        : [...prevRequired, "floor_shipping", "apartment_number_shipping"]
    );
  }, [selected?.use_same_data]);

  const show_options = process.env.SHOW_CHECKOUT_SHIPPING_FORM;

  return (
    <div className={`mt-5 grid grid-cols-6 2xl:grid-cols-5 gap-10 2xl:gap-16`}>
      <div className={`col-span-6 flex flex-col lg:col-span-3`}>
        {show_options === "false" && billing_addresses?.length > 1 && (
          <SelectInput
            className={`!w-fit`}
            errors={errorsTmp}
            placeholder={`Izaberite adresu plaćanja`}
            options={billing_addresses}
            onChange={(e) => {
              if (e.target.value !== "none") {
                setSelected((prev) => ({
                  ...prev,
                  id: e.target.value,
                }));
                handleResetErrors(setErrorsTmp);
              }
            }}
            value={selected?.id}
          />
        )}
        <CheckoutUserInfo
          errors={errorsTmp}
          selected={selected}
          setErrors={setErrorsTmp}
          setFormData={setDataTmp}
          formData={dataTmp}
          className={className}
          items={items}
          refreshCart={refreshCart}
          refreshSummary={refreshSummary}
        />

        {show_options === "false" && (
          <CheckboxInput
            className={`mb-5`}
            placeholder={`Koristi iste podatke za dostavu i naplatu`}
            onChange={(e) => {
              setSelected((prev) => ({
                ...prev,
                use_same_data: e.target.checked,
              }));
            }}
            value={selected?.use_same_data}
            required={false}
          />
        )}

        {show_options === "false" && !selected?.use_same_data && (
          <Form
            className={`grid grid-cols-2 gap-x-5`}
            data={dataTmp}
            errors={errorsTmp}
            fields={formatCheckoutFields(fields, dataTmp)}
            isPending={isPending}
            handleSubmit={() => {}}
            showOptions={false}
            handleInputChange={(e) => {
              if (e?.target?.name === "id_country_shipping") {
                handleInputChange(e, setDataTmp, setErrorsTmp);
                setDataTmp((prev) => ({
                  ...prev,
                  country_name_shipping: e?.target?.selectedOptions[0]?.text,
                }));
                if (e.target.selectedOptions[0]!== 193) {
                  setDataTmp((prev) => ({
                    ...prev,
                    town_name_shipping: ''
                  }))
                }
              } else if (e?.target?.name === "id_town_shipping") {
                handleInputChange(e, setDataTmp, setErrorsTmp);
                setDataTmp((prev) => ({
                  ...prev,
                  town_name_shipping: e?.target?.selectedOptions[0]?.text,
                }));
              } else {
                handleInputChange(e, setDataTmp, setErrorsTmp);
              }
            }}
            buttonClassName={"!hidden"}
          />
        )}

        <CheckoutOptions
          errors={errorsTmp}
          setErrors={setErrorsTmp}
          delivery_options={delivery_options}
          payment_options={payment_options}
          setFormData={setDataTmp}
          formData={dataTmp}
          className={className}
          summary={summary}
          options={options}
          totals={totals}
        />
      </div>

      <div
        className={`col-span-6 md:col-span-4 lg:col-span-3 flex flex-col gap-3 2xl:col-span-2`}
      >
        <div
          className={`customScroll mb-16 pr-2 flex max-h-[400px] flex-col gap-5 overflow-y-auto sm:mb-10`}
        >
          {(items ?? [])?.map(
            ({
              product: {
                basic_data: { id_product, name, sku },
                price,
                inventory,
                image,
                link: { link_path: slug_path },
              },
              cart: { quantity, cart_item_id },
            }) => (
              <CheckoutItems
                key={id_product}
                id={id_product}
                image={image}
                sku={sku}
                inventory={inventory}
                slug_path={slug_path}
                refreshCart={refreshCart}
                name={name}
                price={price}
                isClosed={isClosed}
                refreshSummary={refreshSummary}
                quantity={quantity}
                cart_item_id={cart_item_id}
              />
            )
          )}
        </div>
        <PromoCode />
        <div className={`bg-[#f7f7f7] p-3`}>
          <h3
            className={`pb-4 text-[0.965rem] font-light ${className} uppercase underline`}
          >
            VREDNOST VAŠE KORPE
          </h3>
          <CheckoutTotals
            totals={totals}
            options={options}
            summary={summary}
            className={className}
            formData={dataTmp}
          />
        </div>
        <div className={`flex flex-col`}>
          <div className="flex gap-3 py-2 relative">
            <input
              type="checkbox"
              id="accept_rules"
              name="accept_rules"
              onChange={(e) => {
                setDataTmp({
                  ...dataTmp,
                  accept_rules: e?.target?.checked,
                });
                setErrorsTmp(
                  errorsTmp?.filter((error) => error !== "accept_rules")
                );
              }}
              checked={dataTmp?.accept_rules}
              className="focus:ring-0 focus:border-none rounded-full focus:outline-none text-[#191919] bg-white"
            />
            <label
              htmlFor="agreed"
              className={`text-[0.965rem] font-light ${className}  underline ${
                errorsTmp?.includes("accept_rules") ? `text-red-500` : ``
              }`}
            >
              Saglasan sam sa
              <a
                className={`text-[#e10000] underline max-md:text-[1.15rem]`}
                href={`/stranica-u-izradi`}
                target={`_blank`}
              >
                <span> Opštim uslovima korišćenja</span>
              </a>{" "}
              ECOMMERCE ONLINE SHOP-a.
            </label>
          </div>
          {errorsTmp?.includes("accept_rules") && (
            <p className={`text-red-500 text-[0.75rem]`}>
              Molimo Vas da prihvatite uslove korišćenja.
            </p>
          )}
        </div>
        <button
          disabled={isPending}
          className={`mt-2 w-full ${
            isPending && "!bg-white !text-black opacity-50"
          } h-[3rem] text-center uppercase text-white ${className} border border-[#747579] bg-black py-2 font-light transition-all duration-500 hover:border-[#747579] hover:bg-white hover:text-black`}
          onClick={() => {
            let err = [];
            (required ?? [])?.forEach((key) => {
              //Error handling for countries
              if(dataTmp.id_country_shipping == '-' || dataTmp.id_country_shipping == 0) {
                err = [...err,'id_country_shipping']
              }else if (dataTmp.id_town_shipping === "") {
                err = [...err,'id_town_shipping']
              } 
              else {
                if (!dataTmp[key] || dataTmp[key]?.length === 0) {
                  err.push(key);
                }
              }
            });
            setErrorsTmp(err);
            if (err?.length === 0) {
              checkOut();
            } else {
              window.scrollTo(0, 0);
            }
          }}
        >
          {isPending ? "OBRADA..." : "ZAVRŠI KUPOVINU"}
        </button>
        <div className="hidden xl:block w-full">
          <FreeDeliveryScale summary={summary} />
        </div>
      </div>
      <NoStockModal
        className={className}
        postErrors={postErrors}
        setPostErrors={setPostErrors}
        removeFromCart={removeFromCart}
        setIsClosed={setIsClosed}
      />
      {isCheckoutSuccess && data?.credit_card === null && loading && (
        <div
          className={`fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-100 backdrop-blur-md transition-all duration-500`}
        >
          <Spinner className={`!scale-125`} />
        </div>
      )}
    </div>
  );
};

const NoStockModal = ({
  postErrors,
  setPostErrors,
  removeFromCart,
  setIsClosed,
  className,
}) => {
  return (
    <div
      onClick={(e) => {}}
      className={
        postErrors?.fields?.length > 0
          ? `visible fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-100 backdrop-blur-md transition-all duration-500`
          : `invisible fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-0 backdrop-blur-md transition-all duration-500`
      }
    >
      <div
        className={`relative inset-0 m-auto h-fit w-fit rounded-md bg-white p-[1rem] max-sm:mx-2`}
      >
        <Image
          src={`/fail.png`}
          alt={`ecommerce`}
          width={100}
          height={100}
          className={`absolute -top-[3.15rem] left-0 right-0 mx-auto`}
        />
        <div className={`mt-[3rem] px-[0.25rem] md:px-9`}>
          <h3 className={`mt-4 text-center text-xl font-semibold ${className}`}>
            U korpi su proizvodi koji trenutno nisu na stanju.
          </h3>
          <p className={`mt-2 text-left text-base font-normal ${className}`}>
            Kako bi završili porudžbinu, morate izbrisati sledeće artikle iz
            korpe:
          </p>
          <div
            className={`divide-y-black mt-[0.85rem] flex flex-col divide-y px-5`}
          >
            {(postErrors?.fields ?? [])?.map(
              ({
                cart: { id, item_id },
                product: { id: id_product, name, sku, slug, image },
                errors,
              }) => {
                let deleted_items_count = 0;
                //ako je deleted_items_count jednak broju proizvoda koji nisu na lageru, gasimo modal
                if (deleted_items_count === postErrors?.fields?.length) {
                  setPostErrors(null);
                }

                return (
                  <div
                    key={id}
                    className={`flex items-start gap-2 py-[1.55rem]`}
                  >
                    <Link href={`/${slug}`}>
                      <Image
                        src={image?.[0]}
                        alt={name ?? sku ?? slug ?? "Ecommerce"}
                        width={60}
                        height={100}
                        className={`aspect-2/3 max-h-[72px]`}
                      />
                    </Link>
                    <div className={`flex flex-col`}>
                      <Link
                        href={`/${slug}`}
                        className={`text-sm font-normal ${className}`}
                      >
                        {name}
                      </Link>
                      <ul className={`flex flex-col gap-1`}>
                        {(errors ?? ["Trenutno nije na stanju."])?.map(
                          (error) => (
                            <li
                              key={error}
                              className={`text-[13px] font-bold text-[#e10000] ${className}`}
                            >
                              {error}
                            </li>
                          )
                        )}
                      </ul>
                      <button
                        onClick={async () => {
                          await removeFromCart({ id: id_product });
                          //nakon brisanja, iz postErrors.fields filtriramo taj item i izbacujemo ga
                          let arr = [];
                          arr = (postErrors?.fields ?? [])?.filter(
                            (item) => item.product.id !== id_product
                          );
                          setPostErrors({
                            ...postErrors,
                            fields: arr,
                          });
                        }}
                        className={`mt-1 flex w-[10rem] items-center justify-between bg-[#000] px-2 py-[0.225rem] font-normal text-white transition-all duration-300 hover:bg-[#e10000] hover:bg-opacity-80 ${className}`}
                      >
                        Ukloni iz korpe{" "}
                        <i className="fa-solid fa-trash ml-auto"></i>
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className={`mt-2 flex items-center justify-end`}>
          <button
            className={`ml-auto mt-1 flex items-center justify-between bg-[#000] px-12 py-2 text-center font-normal text-white transition-all duration-300 hover:bg-[#e10000] hover:bg-opacity-80 ${className}`}
            onClick={() => {
              setPostErrors(null);
              setIsClosed(true);
            }}
          >
            Zatvori
          </button>
        </div>
      </div>
    </div>
  );
};
