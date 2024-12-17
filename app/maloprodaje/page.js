import Link from "next/link";
import MaloprodajePage from "@/components/MaloprodajePage/MaloprodajePage";
import { headers } from "next/headers";

const Maloprodaje = () => {
  return (
    <>
      <div className={`text-left w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
        <div className={`flex items-center gap-2`}>
          <Link className={`text-[0.95rem]`} href={`/`}>
            Početna
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <span className={`text-[0.95rem]`}>Maloprodaje</span>
        </div>
        <h1
          className={`text-[23px] md:text-[29px] font-normal mt-5 w-full border-b pb-2`}
        >
          Maloprodaje
        </h1>
      </div>
      <MaloprodajePage />
    </>
  );
};

export default Maloprodaje;

export const generateMetadata = async ({ searchParams: { search } }) => {
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: `Maloprodaje | Fashion Template`,
    description: "Dobrodošli na Fashion Template Online Shop",
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `Maloprodaje | Fashion Template`,
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
