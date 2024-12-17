"use client";
import { useCallback, useState } from "react";
import {
  GoogleReCaptchaProvider as Provider,
  GoogleReCaptcha as ReCaptcha,
} from "react-google-recaptcha-v3";
import { post as POST } from "@/api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSearchParams } from "next/navigation";

import { useProduct } from "@/hooks/ecommerce.hooks";

const Contact = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data } = useProduct({ slug: id });

  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const requiredFields = [
    "customer_name",
    "phone",
    "email",
    "subject",
    "message",
    "accept_rules",
  ];

  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);

  const [formData, setFormData] = useState({
    page_section: "contact_page",
    customer_name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    accept_rules: false,
    gcaptcha: token,
  });

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
      await POST("/contact/contact_page", {
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
            subject: "",
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
        }
      });
    }
  };

  return (
    <Provider reCaptchaKey={process.env.CAPTCHAKEY}>
      <ReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={refreshReCaptcha} />
      <div className="w-full max-w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-20 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-10 min-h-[200px]">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* First Name */}
            <div className="flex flex-col gap-2">
              <input
                required
                type="text"
                value={formData.customer_name}
                name="customer_name"
                id="customer_name"
                onChange={handleChange}
                placeholder="Ime"
                className={`p-2 border border-slate-300 focus:border-b-4 focus:border-black focus:ring-0 ${errors.includes("customer_name") ? "border-red-500" : ""} h-[45px]`}
              />
            </div>
            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <input
                required
                type="text"
                value={formData.last_name}
                name="last_name"
                id="last_name"
                onChange={handleChange}
                placeholder="Prezime"
                className={`p-2 focus:border-b-4 focus:border-black focus:ring-0 ${errors.includes("last_name") ? "border-red-500" : "border-slate-300"} h-[45px]`}
              />
            </div>
          </div>

          {/* Phone and Email */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <input
                required
                type="text"
                value={formData.phone}
                name="phone"
                id="phone"
                onChange={handleChange}
                placeholder="Telefon"
                className={`p-2 focus:border-b-4 focus:border-black focus:ring-0 ${errors.includes("phone") ? "border-red-500" : "border-slate-300"} h-[45px]`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                required
                type="email"
                value={formData.email}
                name="email"
                id="email"
                onChange={handleChange}
                placeholder="Email"
                className={`p-2 focus:border-b-4 focus:border-black focus:ring-0 ${errors.includes("email") ? "border-red-500" : "border-slate-300"} h-[45px]`}
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2 flex-grow">
            <textarea
              required
              name="message"
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Poruka"
              className={`border p-2 focus:border-[#04b400] ${errors.includes("message") ? "border-red-500" : "border-slate-300"} h-[100px]`}
            />
          </div>
        </form>

        {/* Contact Information */}
        <div className="flex flex-col justify-between bg-gray-200 p-10">
          <div className="grid grid-cols-2 ">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">Budimo u kontaktu</h2>
              <p>+381 32 49 32 412</p>
              <p>+381 36 43 64 445</p>
              <p>+381 36 43 64 445</p>
              <p>office@maximon.rs</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">Alti Moda D.O.O.</h2>
              <p>Rudnička 1, Čačak 32000, Srbija</p>
              <p>MB: 21735043</p>
              <p>PIB: 112766359</p>
              <p>Broj računa: 170-0030055138000-61</p>
            </div>
          </div>
        </div>

        {/* Submit Button (Below the form) */}
        <div className="w-full mt-[-15px]">
          <button
            type="submit"
            className={`bg-black text-white py-3 w-[250px] ${loading ? "cursor-wait" : "cursor-pointer"}`}
            disabled={loading}
          >
            {loading ? <i className="fa fa-spinner fa-spin"></i> : "POŠALJITE PORUKU"}
          </button>
        </div>
      </div>
    </Provider>
  );
};

export default Contact;
