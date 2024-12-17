// @ts-check
"use client";
import { useCallback, useState } from "react";
import { post as POST } from "@/api/api";
import {
    GoogleReCaptcha as Captcha,
    GoogleReCaptchaProvider as Provider,
} from "react-google-recaptcha-v3";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ZamenaZaIstiArtikal = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        message: "",
        address: "",
        phone: "",
        bank_account: "",
        email: "",
        order_number: "",
        loyalty_card_number: "",
        sku: "",
        returning_size: "",
        new_size: "",
        returning_amount: "",
        new_amount: "",
    });
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [errors, setErrors] = useState([]);
    const required = [
        "first_name",
        "last_name",
        "address",
        "email",
        "phone",
        "order_number",
        "bank_account",
        "sku",
        "returning_size",
        "new_size",
        "returning_amount",
        "new_amount",
    ];
    const verifyCaptcha = useCallback((token) => {
        setToken(token);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        let err = [];
        err = errors.filter((error) => error !== e.target.name);
        setErrors(err);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const errors = [];
        required.forEach((field) => {
            if (!formData[field]) {
                errors.push(field);
            }
        });
        if (errors.length > 0) {
            setErrors(errors);
            setLoading(false);
            return;
        } else {
            setErrors([]);
            await POST("contact/contact_page", {
                page_section: "contact_page",
                customer_name: formData?.first_name + " " + formData?.last_name,
                email: formData?.email,
                phone: formData?.phone,
                mail_to: "",
                subject: "Zamena za isti artikal",
                company_sector: "",
                message: `Razlog za menjanje: ${formData?.message} \n Ime: ${formData?.first_name} \n Prezime: ${formData?.last_name} \n Adresa: ${formData?.address} \n Email: ${formData?.email} \n Telefon: ${formData?.phone} \n Broj porudzbenice: ${formData?.order_number} \n Broj loyalty kartice: ${formData?.loyalty_card_number} \n Šifra artikla koji se vraća: ${formData?.sku} \n Veličina koja se vraća: ${formData?.returning_size} \n Nova veličina: {formData?.new_size} \n Količina koja se vraća: ${formData?.returning_amount} \n Nova količina: ${formData?.new_amount} \n Razlog za zamenu: ${formData?.reasons_of_return}`,
                accept_rules: true,
                gcaptcha: token,
            }).then((res) => {
                switch (res?.code) {
                    case 200:
                        toast.success("Uspešno ste poslali zahtev za zamenu.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                        });
                        setLoading(false);
                        setFormData({
                            first_name: "",
                            last_name: "",
                            message: "",
                            address: "",
                            phone: "",
                            bank_account: "",
                            email: "",
                            order_number: "",
                            loyalty_card_number: "",
                            sku: "",
                            returning_size: "",
                            new_size: "",
                            returning_amount: "",
                            new_amount: "",
                        });
                        break;
                    default:
                        toast.error("Došlo je do greške, molimo Vas pokušajte ponovo.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                        });
                        setLoading(false);
                        break;
                }
            });
        }
    };

    return (
        <Provider reCaptchaKey={process.env.CAPTCHAKEY}>
            <Captcha onVerify={verifyCaptcha} refreshReCaptcha={true} />
            <div className="mt-[1.2rem] md:mt-[9rem] w-[95%] mx-auto md:w-[60%]">
                <h1 className="text-center pb-7 text-[#262626] text-[1.313rem] font-bold">
                    Zamena za isti artikal
                </h1>
                <h5>
                    <strong>Rok za zamenu</strong>
                </h5>
                <p>
                    Zamenu artikla možete obaviti u roku od 14 dana od trenutka prelaska
                    artikla u Va&scaron;e vlasni&scaron;tvo.
                </p>
                <p></p>
                <h5>
                    <strong>Zamena</strong>
                </h5>
                <p>
                    U slučaju da ste nakon prijema artikla utvrdili da smo Vam poslali
                    pogre&scaron;an ili eventualno o&scaron;tećen artikal, zamenu ovog
                    artikla možete izvr&scaron;iti o&nbsp;
                    <u>na&scaron;em tro&scaron;ku</u>.<br />
                    <strong>Uslov</strong>&nbsp;da ostvarite zamenu artikla o na&scaron;em
                    tro&scaron;ku, je da nam artikal vratite&nbsp;
                    <strong>
                        isključivo<span>&nbsp;</span>
                    </strong>
                    <strong>D-Express</strong>
                    <strong>
                        <span>&nbsp;</span>kurirskom službom
                    </strong>
                    , i da D-Espress-u obavezno napomenete, da se &scaron;alje O
                    TRO&Scaron;KU Croonus-ja PREKO UGOVORA.
                    <br />U slučaju da nam artikal po&scaron;aljete nekom drugom kurirskom
                    službom, po&scaron;iljka neće biti primljena, već će Vam biti vraćena,
                    i u tom slučaju sve tro&scaron;kove slanja i povrata ide na Va&scaron;
                    tro&scaron;ak.
                    <br />
                    Artikal nam &scaron;aljete na adresu sa računa (Kralja Petra I 30,32000 Čačak), sa naznakom problema koji je nastao, uz račun, odnosno
                    dokaz o kupovini.
                </p>
                <p>
                    Potro&scaron;ač nema pravo na zamenu artikla u slučaju isporuke
                    zapečaćene robe koja se ne može vratiti zbog&nbsp;
                    <u>za&scaron;tite zdravlja ili higijenskih razloga</u>&nbsp;i koja je
                    otpečaćena nakon isporuke. Dakle, u slučaju da je proizvod otpakovan
                    pretpostavlja se da je isti kori&scaron;ćen, zbog čega potro&scaron;ač
                    nema pravo da odustane od ugovora, ili izvr&scaron;i zamenu, ako je
                    reč o donjem ve&scaron;u, kupaćim gaćama, kupaćim kostimima, čarapama.
                </p>
                <p>
                    Artikal ne možete samoinicijativno menjati u nekom od maloprodajnih
                    objekata Croonus-ja.
                </p>
                <p>
                    Artikal nije moguće menjati ukoliko je no&scaron;en &ndash; &scaron;to
                    se može utvrditi ekspertizom.
                </p>
                <p></p>
                <h5>Zamena za isti artikal</h5>
                <p>
                    Ukoliko ste nakon prijema artikla utvrdili da Vam ne odgovara
                    veličina, molimo Vas da nas kontaktirate putem forme ispod.
                    <br />I u ovom slučaju, artikal nam možete poslati bilo kojom
                    kurirskom službom o&nbsp;<u>Va&scaron;em tro&scaron;ku</u>.<br />
                    Artikal nam &scaron;aljete na adresu sa računa (Kralja Petra I 30,32000 Čačak), uz račun, odnosno dokaz o kupovini.
                    <br />
                    Dostava zamenskog artikla takođe ide o Va&scaron;em tro&scaron;ku.
                </p>
                <p>
                    <u>Predlažemo Vam</u>&nbsp;da kada nam &scaron;aljete robu o
                    Va&scaron;em tro&scaron;ku, bilo u cilju zamene ili odustajanja od
                    kupovine, robu &scaron;aljete preko&nbsp;<u>D-Express</u>
                    <u>
                        <span>&nbsp;</span>kurirske službe
                    </u>
                    , jer je D-Express na&scaron; poslovni partner.
                    <br />U slučaju bilo kakvih sporova ili problema, mnogo nam je
                    lak&scaron;e da iste re&scaron;avamo sa svojim poslovnim partnerom,
                    nego sa firmama koje to nisu.
                    <br />
                    Naravno, na Vama ostaje izbor kurirske službe preko koje ćete nam
                    poslati robu kada &scaron;aljete o svom tro&scaron;ku.
                </p>
                <div className={`mt-10`}>
                    <form
                        className={`mt-10 grid max-md:grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-3`}
                        onSubmit={handleSubmit}
                    >
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Ime <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.first_name}
                                name={`first_name`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("first_name")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Prezime <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.last_name}
                                name={`last_name`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("last_name")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Adresa i grad{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.address}
                                name={`address`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("address")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Email <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`email`}
                                disabled={false}
                                value={formData.email}
                                name={`email`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("email")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Telefon <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.phone}
                                name={`phone`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("phone")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Broj računa otpremnice/porudžbine{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.order_number}
                                name={`order_number`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("order_number")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Broj dinarskog tekućeg računa{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.bank_account}
                                name={`bank_account`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("bank_account")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Broj loyalty kartice
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.loyalty_card_number}
                                name={`loyalty_card_number`}
                                onChange={handleChange}
                                className={`mt-1 w-full border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Šifra artikla koji se vraća{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.sku}
                                name={`sku`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("sku")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Veličina koja se vraća{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.returning_size}
                                name={`returning_size`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("returning_size")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Nova veličina{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.new_size}
                                name={`new_size`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("new_size")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Količina koja se vraća{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.returning_amount}
                                name={`returning_amount`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("returning_amount")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Nova količina{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.new_amount}
                                name={`new_amount`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("new_amount")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div
                            className={`col-span-1 md:col-span-2 flex flex-col items-start`}
                        >
                            <label className={`text-base font-light`}>
                                Razlog zašto se menja artikal
                            </label>
                            <textarea
                                rows={5}
                                disabled={false}
                                value={formData.message}
                                name={`message`}
                                onChange={handleChange}
                                className={`mt-1 w-full
                          border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0
                  `}
                            />
                        </div>

                        <div className={`col-span-1 md:col-span-2`}>
                            <div className={`flex justify-end items-center`}>
                                <button
                                    type={`submit`}
                                    className={`px-10 py-2 max-sm:w-full hover:bg-opacity-80 bg-[#191919] text-white`}
                                    onClick={handleSubmit}
                                >
                                    {loading ? (
                                        <i
                                            className={`fa fa-solid fa-spinner fa-spin text-white text-center text-lg`}
                                        />
                                    ) : (
                                        `Pošalji`
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Provider>
    );
};

export default ZamenaZaIstiArtikal;
