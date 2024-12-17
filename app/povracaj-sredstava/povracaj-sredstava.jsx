"use client";
import { useCallback, useState } from "react";
import { post as POST } from "@/api/api";
import {
    GoogleReCaptcha as Captcha,
    GoogleReCaptchaProvider as Provider,
} from "react-google-recaptcha-v3";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Povracaj = () => {
    const [token, setToken] = useState(null);

    const [formData, setFormData] = useState({
        message: "",
        date_of_contract: null,
        date_of_arrival: null,
        reasons_of_return: "",
        full_name: "",
        id_number: "",
        address: "",
        bank_account: "",
        email: "",
        today_date: null,
        gcaptcha: token,
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const required = [
        "message",
        "date_of_contract",
        "date_of_arrival",
        "full_name",
        "id_number",
        "address",
        "bank_account",
        "email",
        "today_date",
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

    const convertDate = (date) => {
        const d = new Date(date);
        const ye = new Intl.DateTimeFormat("sr", { year: "numeric" }).format(d);
        const mo = new Intl.DateTimeFormat("sr", { month: "2-digit" }).format(d);
        const da = new Intl.DateTimeFormat("sr", { day: "2-digit" }).format(d);
        return `${da}.${mo}.${ye}`;
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
                customer_name: formData?.full_name,
                email: formData?.email,
                phone: "null",
                mail_to: "",
                subject: "Povraćaj sredstava",
                company_sector: "",
                message: `Odustajanje od robe: ${
                    formData?.message
                } \n Datum zaključenja ugovora: ${convertDate(
                    formData?.date_of_contract
                )} \n Datum prijema robe: ${convertDate(
                    formData?.date_of_arrival
                )} \n Razlozi za odustanak: ${
                    formData?.reasons_of_return
                } \n Ime i prezime potrošača: ${
                    formData?.full_name
                } \n Broj lične karte: ${formData?.id_number} \n Adresa potrošača: ${
                    formData?.address
                } \n Broj tekućeg računa potrošača: ${
                    formData?.bank_account
                } \n Email potrošača: ${formData?.email} \n Datum: ${convertDate(
                    formData?.today_date
                )}`,
                accept_rules: true,
                gcaptcha: token,
            }).then((res) => {
                switch (res?.code) {
                    case 200:
                        toast.success("Uspešno ste poslali zahtev za povraćaj sredstava.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                        });
                        setLoading(false);
                        setFormData({
                            message: "",
                            date_of_contract: "",
                            date_of_arrival: "",
                            reasons_of_return: "",
                            full_name: "",
                            id_number: "",
                            address: "",
                            bank_account: "",
                            email: "",
                            today_date: "",
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
            <div className="mt-[1.2rem] prose md:mt-[9rem] w-[95%] mx-auto md:w-[60%]">
                <h1 className="text-center pb-7 text-[#262626] text-[1.313rem] font-bold">
                    Povraćaj sredstava
                </h1>
                <section
                    className=" elementor-section elementor-top-section elementor-element elementor-element-0a8acc7 elementor-section-full_width elementor-section-height-min-height elementor-section-height-default elementor-section-items-middle"
                    data-id="0a8acc7"
                    data-element_type="section"
                >
                    <div className="elementor-container elementor-column-gap-no">
                        <div
                            className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-a6a340b"
                            data-id="a6a340b"
                            data-element_type="column"
                        >
                            <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                    className="elementor-element elementor-element-c66c04d elementor-widget elementor-widget-heading"
                                    data-id="c66c04d"
                                    data-element_type="widget"
                                    data-widget_type="heading.default"
                                ></div>
                                <div
                                    className="elementor-element elementor-element-7058982 elementor-widget elementor-widget-woocommerce-breadcrumb"
                                    data-id="7058982"
                                    data-element_type="widget"
                                    data-widget_type="woocommerce-breadcrumb.default"
                                ></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    className="elementor-section flex flex-col gap-3 elementor-top-section elementor-element elementor-element-3902c11 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                    data-id="3902c11"
                    data-element_type="section"
                >
                    <div className="elementor-container elementor-column-gap-no">
                        <div
                            className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-8d3493f"
                            data-id="8d3493f"
                            data-element_type="column"
                        >
                            <div className="elementor-widget-wrap elementor-element-populated">
                                <div
                                    className="elementor-element elementor-element-6f411518 elementor-widget elementor-widget-text-editor"
                                    data-id="6f411518"
                                    data-element_type="widget"
                                    data-widget_type="text-editor.default"
                                >
                                    <div className="elementor-widget-container">
                                        <div className="page-title-wrapper">
                                            <div className="container">
                                                <div className="page-title-wrapper">
                                                    <div className="container">
                                                        <div className="page-title-wrapper">
                                                            <div className="container">
                                                                <p>
                                                                    U slučaju odustanka od ugovora potro&scaron;ač
                                                                    ima pravo na povraćaj novca ili na zamenu za
                                                                    drugi proizvod. Iznos plaćene robe kupcu se
                                                                    vraća po prijemu proizvoda koji vraća zbog
                                                                    odustanka od ugovora, pod uslovom da se utvrdi
                                                                    da je proizvod neo&scaron;tećen, tj. ispravan.
                                                                </p>
                                                                <p>
                                                                    Trgovac je dužan da potro&scaron;aču bez
                                                                    odlaganja vrati iznos koji je potro&scaron;ač
                                                                    platio po osnovu ugovora, a najkasnije u roku
                                                                    od 14 dana od dana prijema izjave o odustanku,
                                                                    odnosno od prijema proizvoda koji kupac vraća
                                                                    zbog odustanka od ugovora.
                                                                </p>
                                                                <p>
                                                                    Tro&scaron;kove vraćanja robe snosi kupac,
                                                                    osim u slučajevima kada je kupac dobio
                                                                    neispravan ili pogre&scaron;an artikal.
                                                                </p>
                                                                <p></p>
                                                                <h5>
                                                                    <strong>
                                                                        Procedura za povraćaj sredstava
                                                                    </strong>
                                                                </h5>
                                                                <p>
                                                                    Da bi se izvr&scaron;io povraćaj novčanih
                                                                    sredstava potrebni su nam sledeći podaci:
                                                                </p>
                                                                <ul>
                                                                    <li>Va&scaron;i lični podaci;</li>
                                                                    <li>
                                                                        Broj kupovnog računa (račun ste dobili uz
                                                                        kupljeni proizvod);
                                                                    </li>
                                                                    <li>
                                                                        Broj dinarskog tekućeg računa, na koji će
                                                                        biti uplaćena novčana sredstva (u slučaju da
                                                                        je plaćanje izvr&scaron;eno pouzećem);
                                                                    </li>
                                                                    <li>Broj lične karte;</li>
                                                                </ul>
                                                                <p>
                                                                    Tražene podatke možete nam dostaviti
                                                                    popunjavanjem forme ispod teksta.
                                                                    <br />
                                                                    Povraćaj sredstava se vr&scaron;i isključivo
                                                                    uplatom na dinarski tekući račun kada je
                                                                    plaćanje izvr&scaron;eno pouzećem.
                                                                    <br />U slučaju da je plaćanje izvr&scaron;eno
                                                                    platnom karticom, povraćaj sredstava se
                                                                    vr&scaron;i uplatom na račun sa kog je
                                                                    izvr&scaron;eno plaćanje.
                                                                    <br />
                                                                    Povraćaj novčanih sredstava se ne može
                                                                    zahtevati odlaskom u neki od maloprodajnih
                                                                    objekata Croonus-ja.
                                                                </p>
                                                                <p>
                                                                    U slučaju vraćanja robe ili povraćaja
                                                                    sredstava kupcu koji je prethodno
                                                                    izvr&scaron;io plaćanje nekom od platnih
                                                                    kartica (delimično ili u celosti), a bez
                                                                    obzira na razlog vraćanja, Croonus internet
                                                                    prodavnica je u obavezi da povraćaj
                                                                    izvr&scaron;i isključivo putem VISA i
                                                                    Mastercard metoda plaćanja, tako &scaron;to će
                                                                    banka na zahtev prodavca obaviti povraćaj
                                                                    sredstava na račun korisnika kartice.
                                                                </p>
                                                                <p>
                                                                    Ukoliko iz nekog razloga ne možete poslati
                                                                    zahtev za povraćaj novčanih sredstava preko
                                                                    forme za povraćaj sredstava, možete nas
                                                                    kontaktirati preko telefona {process.env.TELEPHONE}.
                                                                    <br />
                                                                    Takođe, ako imate dodatna pitanja, uvek nas
                                                                    možete kontaktirati preko istog broja
                                                                    telefona.
                                                                    <br />
                                                                    Va&scaron; Croonus
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={`mt-10`}>
                    <h1 className={`text-lg font-medium`}>Podaci o firmi</h1>
                    <form
                        className={`mt-10 grid max-md:grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-3`}
                        onSubmit={handleSubmit}
                    >
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>Naziv firme</label>
                            <input
                                type={`text`}
                                disabled
                                value={`Croonus`}
                                className={`mt-1 w-full border border-[#e0e0e0]`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>Adresa</label>
                            <input
                                type={`text`}
                                disabled
                                value={`Kralja Petra I 30, 32000 Čačak`}
                                className={`mt-1 w-full border border-[#e0e0e0]`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>Broj telefona</label>
                            <input
                                type={`text`}
                                disabled
                                value={`${process.env.TELEPHONE}`}
                                className={`mt-1 w-full border border-[#e0e0e0]`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>Email</label>
                            <input
                                type={`text`}
                                disabled
                                value={`info@croonus.com`}
                                className={`mt-1 w-full border border-[#e0e0e0]`}
                            />
                        </div>
                        <div className={`col-span-1 md:col-span-2 text-left mt-5`}>
                            <h1 className={`text-lg font-medium`}>Podaci o potrošaču</h1>
                        </div>
                        <div className={`mt-5 col-span-1 md:col-span-2 flex flex-col`}>
                            <label className={`text-base font-light`}>
                                Ovim obaveštavam da odustajem od ugovora o prodaji sledeće
                                robe/usluge
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <textarea
                                type={`text`}
                                disabled={false}
                                name={`message`}
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className={`mt-1 w-full ${
                                    errors.includes("message")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Datum zaključenja ugovora{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`date`}
                                disabled={false}
                                value={formData.date_of_contract}
                                name={`date_of_contract`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("date_of_contract")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Datum prijema robe{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`date`}
                                disabled={false}
                                value={formData.date_of_arrival}
                                name={`date_of_arrival`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("date_of_arrival")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>

                        <div
                            className={`col-span-1 md:col-span-2 flex flex-col items-start`}
                        >
                            <label className={`text-base font-light`}>
                                Razlozi za odustanak (nije obavezno popunjavati)
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.reasons_of_return}
                                name={`reasons_of_return`}
                                onChange={handleChange}
                                className={`mt-1 w-full border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Ime i prezime potrošača
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.full_name}
                                name={`full_name`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("full_name")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Broj lične karte
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.id_number}
                                name={`id_number`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("id_number")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Adresa potrošača
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
                                Broj tekućeg računa potrošača
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
                                Email potrošača
                                <span className={`snap-mandatory text-red-500`}>*</span>
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
                                Datum
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`date`}
                                disabled={false}
                                value={formData.today_date}
                                name={`today_date`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("today_date")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
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

export default Povracaj;
