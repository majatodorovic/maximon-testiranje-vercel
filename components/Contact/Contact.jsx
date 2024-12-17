"use client";
import { useCallback, useState } from "react";
import {
  GoogleReCaptchaProvider as Provider,
  GoogleReCaptcha as ReCaptcha,
} from "react-google-recaptcha-v3";
import { post as POST } from "@/api/api";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSearchParams } from "next/navigation";

import { useProduct } from "@/hooks/ecommerce.hooks";

const Contact = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const { data } = useProduct({ slug: id });

  const [token, setToken] = useState();
  //
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  //
  const [errors, setErrors] = useState([]);
  //
  const [loading, setLoading] = useState(false);
  //
  const requiredFields = [
    "customer_name",
    "phone",
    "email",
    "subject",
    "message",
    "accept_rules",
  ];
  //
  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);
  //
  const [formData, setFormData] = useState({
    page_section: "contact_page",
    customer_name: "",
    phone: "",
    email: "",
    mail_to: "",
    subject: "",
    company_sector: "",
    message: "",
    accept_rules: false,
    gcaptcha: token,
  });
  //
  const handleChange = ({ target }) => {
    let err = [];
    err = errors.filter((error) => error !== target.name);
    setErrors(err);

    if (target.name === "accept_rules") {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };
  //
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const errors = [];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors.push(field);
      }
      setErrors(errors);
    });
    if (errors?.length > 0) {
      setLoading(false);
    } else {
      await POST(`/contact/contact_page`, {
        ...formData,
        gcaptcha: token,
      }).then((res) => {
        if (res?.code === 200) {
          toast.success("Uspešno ste poslali poruku!", {
            position: "top-center",
            autoClose: 2000,
          });
          setLoading(false);
          setFormData({
            page_section: "contact_page",
            customer_name: "",
            phone: "",
            email: "",
            mail_to: "",
            subject: "",
            company_sector: "",
            message: "",
            accept_rules: false,
            gcaptcha: token,
          });
        } else {
          toast.error("Došlo je do greške! Pokušajte ponovo.", {
            position: "top-center",
            autoClose: 2000,
          });
          setLoading(false);
          setFormData({
            page_section: "contact_page",
            customer_name: "",
            phone: "",
            email: "",
            mail_to: "",
            subject: "",
            company_sector: "",
            message: "",
            accept_rules: false,
            gcaptcha: token,
          });
        }
      });
    }
  };

  return (
    <Provider reCaptchaKey={process.env.CAPTCHAKEY}>
      <ReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={refreshReCaptcha} />
      <div
        className={`w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5 grid grid-cols-3 gap-x-10 gap-y-10`}
      >
        <div className={`col-span-3 lg:col-span-1`}>
          <p className={`text-[0.95rem] mt-5`}>
            Ukoliko imate pitanja, sugestije ili želite da se učlanite u našu
            organizaciju, slobodno nam se obratite. Odgovorićemo Vam u najkraćem
            roku.
          </p>
          <div className={`flex flex-col gap-2 mt-5`}>
            <div className={`flex items-center gap-2`}>
              <i
                className={`fa fa-map-marker text-[16px] w-5 text-[#04b400]`}
              ></i>
              <span className={`text-[0.95rem]`}>
                <span className={`font-bold`}>Adresa 1:</span> Kralja Petra I
                30, 32000 Čačak
              </span>
            </div>
            <div className={`flex items-center gap-2`}>
              <i
                className={`fa fa-map-marker text-[16px] w-5 text-[#04b400]`}
              ></i>
              <span className={`text-[0.95rem]`}>
                <span className={`font-bold`}>Adresa 2:</span> Borska 32, 11000
                Beograd
              </span>
            </div>
            <div className={`flex items-center gap-2`}>
              <i
                className={`fa fa-map-marker text-[16px] w-5 text-[#04b400]`}
              ></i>
              <span className={`text-[0.95rem]`}>
                <span className={`font-bold`}>Adresa 3:</span> Old Vine Blvd
                Lewes,United States
              </span>
            </div>
            <div className={`flex items-center gap-2`}>
              <i className={`fa fa-phone text-[16px] w-5 text-[#04b400]`}></i>
              <span className={`text-[0.95rem]`}>
                <span className={`font-bold`}>Kontakt telefon:</span> +381 32 51
                22 052
              </span>
            </div>
          </div>
        </div>
        <div className="w-full col-span-3 lg:col-span-2 mx-auto">
          <div className="mb-4 text-xl">
            Zainteresovan sam za artikal {data?.data?.item?.basic_data?.sku}
          </div>
          <form onSubmit={handleSubmit} className={`w-full`}>
            <div
              className={`rounded-lg border p-2 lg:p-5 grid gap-5 grid-cols-2`}
            >
              <div className={`flex flex-col gap-2 col-span-2 lg:col-span-1`}>
                <label htmlFor={`customer_name`}>Ime i prezime</label>
                <input
                  required={true}
                  type={`text`}
                  value={formData.customer_name}
                  name={`customer_name`}
                  id={`customer_name`}
                  onChange={handleChange}
                  className={`${errors.includes("customer_name")
                    ? "border-red-500"
                    : " border-slate-300"
                    } border rounded-lg focus:border-[#04b400] focus:ring-0 focus:outline-0 p-2`}
                />
              </div>
              <div className={`flex flex-col gap-2 col-span-2 lg:col-span-1`}>
                <label htmlFor={`phone`}>Telefon</label>
                <input
                  required={true}
                  type={`text`}
                  value={formData.phone}
                  name={`phone`}
                  id={`phone`}
                  onChange={handleChange}
                  className={`${errors.includes("phone")
                    ? "border-red-500"
                    : " border-slate-300"
                    } rounded-lg focus:border-[#04b400] focus:ring-0 focus:outline-0 p-2`}
                />
              </div>
              <div className={`flex flex-col gap-2 col-span-2 lg:col-span-1`}>
                <label htmlFor={`email`}>Email</label>
                <input
                  required={true}
                  type={`email`}
                  name={`email`}
                  value={formData.email}
                  id={`email`}
                  onChange={handleChange}
                  className={`${errors.includes("email")
                    ? "border-red-500"
                    : " border-slate-300"
                    } rounded-lg focus:border-[#04b400] focus:ring-0 focus:outline-0 p-2`}
                />
              </div>
              <div className={`flex flex-col gap-2 col-span-2 lg:col-span-1`}>
                <label htmlFor={`subject`}>Naslov poruke</label>
                <input
                  required={true}
                  type={`text`}
                  value={formData.subject}
                  name={`subject`}
                  id={`subject`}
                  onChange={handleChange}
                  className={`${errors.includes("subject")
                    ? "border-red-500"
                    : " border-slate-300"
                    } rounded-lg focus:border-[#04b400] focus:ring-0 focus:outline-0 p-2`}
                />
              </div>
              <div className={`flex flex-col gap-2 col-span-2`}>
                <label htmlFor={`message`}>Poruka</label>
                <textarea
                  name={`message`}
                  id={`message`}
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`${errors.includes("message")
                    ? "border-red-500"
                    : " border-slate-300"
                    } rounded-lg focus:border-[#04b400] focus:ring-0 focus:outline-0 p-2`}
                />
              </div>
              <div
                className={`flex flex-col lg:flex-row items-start max-lg:gap-5 lg:items-center justify-between  col-span-2`}
              >
                <div className={`gap-2 flex items-center`}>
                  <input
                    required={true}
                    type={`checkbox`}
                    name={`accept_rules`}
                    id={`accept_rules`}
                    checked={formData.accept_rules}
                    onChange={handleChange}
                    className={`${errors.includes("accept_rules")
                      ? "border-red-500"
                      : " border-slate-300"
                      } rounded-lg focus:border-[#04b400] focus:ring-0 focus:outline-0 p-2 text-[#04b400]`}
                  />
                  <label htmlFor={`accept_rules`}>
                    <span className={`text-[0.85rem]`}>
                      Slažem se sa{" "}
                      <Link
                        href={`/zastita-privatnosti`}
                        className={`underline text-[#04b400]`}
                      >
                        politikom privatnosti
                      </Link>
                    </span>
                  </label>
                </div>
                <div className={`max-lg:w-full`}>
                  <button
                    type={`button`}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    className={`${loading ? `bg-[#04b400]` : `bg-black`
                      } lg:hover:bg-[#04b400] transition-all duration-500 text-white px-5 py-2 rounded-lg w-full`}
                  >
                    {loading ? (
                      <i
                        className={`
                    fa fa-spinner fa-spin text-white text-center
                    `}
                      ></i>
                    ) : (
                      `Pošalji`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Provider>
  );
};

export default Contact;
