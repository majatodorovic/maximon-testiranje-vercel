import Link from "next/link";
import Contact from "@/components/Contact/Contact";
import { headers } from "next/headers";
import { generateOrganizationSchema } from "@/_functions";

const Kontakt = () => {
  let all_headers = headers();
  let base_url = all_headers.get("x-base_url");

  let schema = generateOrganizationSchema(base_url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className={`text-left w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
        <div className={`flex items-center gap-2`}>
          <Link className={`text-[0.95rem]`} href={`/`}>
            Početna
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <span className={`text-[0.95rem]`}>Kontakt</span>
        </div>
        <h1
          className={`text-[23px] md:text-[29px] font-normal mt-5 w-full pb-2 text-center`}
        >
          KONTAKT
        </h1>
        <p className="text-center">Ukoliko imate neko pitanje, sugestiju ili kritiku, <br /> bice nam zadovoljstvo da Vam odgovorimo i izađemo u susret</p>
      </div>
      <Contact />

    </>
  );
};

export default Kontakt;

export const generateMetadata = async ({ searchParams: { search } }) => {
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: `Kontakt | Fashion Template`,
    description: "Dobrodošli na Fashion Template Online Shop",
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `Kontakt | Fashion Template`,
      description: "Dobrodošli na Fashion Template Online Shop",
      type: "website",
      images: [
        {
          url: "https://api.fashiondemo.croonus.com/croonus-uploads/config/b2c/logo-c36f3b94e6c04cc702b9168481684f19.webp",
          width: 800,
          height: 600,
          alt: "Fashion Template",
        },
      ],
      locale: "sr_RS",
    },
  };
};
