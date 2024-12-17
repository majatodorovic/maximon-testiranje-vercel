"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const [open, setOpen] = useState({
    id: null,
  });

  const pathname = usePathname();

  return (
    <div className="max-md:mt-[3rem] mt-[7.75rem] bg-[#f7f7f7]">
      <div className="mx-[5rem] max-xl:flex-col py-[2.625rem] flex items-center justify-between border-l-0 border-t-0 border-r-0 border-b-2 border-b-white">
        <div>
          <Link href={`/`}>
            <Image
              src={"/images/logo/logo.png"}
              width={214}
              height={45}
              alt="Croonus Logo"
            />
          </Link>
        </div>
        <div className="flex max-xl:flex-col max-xl:gap-[2rem] max-xl:mt-10 items-center gap-[5.625rem]">
          <div className="flex flex-col font-bold items-center text-center justify-center gap-1">
            <p className="text-[#171717] uppercase text-[0.813rem]">
              Besplatna dostava za
            </p>
            <p className="text-[#171717] uppercase text-[0.813rem]">
              Iznos preko <span className="text-[#04b400]">6.000 RSD</span>
            </p>
          </div>{" "}
          <div className="flex flex-col font-bold items-center text-center justify-center gap-1">
            <p className="text-[#171717] uppercase text-[0.813rem]">
              Rok isporuke do
            </p>
            <p className="text-[#171717] uppercase text-[0.813rem]">
              <span className="text-[#04b400]">2</span> radna dana
            </p>
          </div>{" "}
          <div className="flex flex-col font-bold items-center text-center justify-center gap-1">
            <p className="text-[#171717] uppercase text-[0.813rem]">
              Povrat robe
            </p>
            <p className="text-[#171717] uppercase text-[0.813rem]">
              U roku od <span className="text-[#04b400]">14</span> dana
            </p>
          </div>
        </div>
        <div className="flex max-xl:mt-10 items-center gap-[1.938rem]">
          <a href="https://www.instagram.com/lifeatcroonus/" target={"_blank"}>
            <Image
              src={"/icons/instagram.png"}
              width={30}
              height={30}
              alt="Instagram"
              className="hover:scale-110 transition-all duration-300"
            />
          </a>
          <a
            href="https://www.youtube.com/channel/UCTCxl3sqxPqafMhOsKVVEMQ/videos?view_as=subscriber"
            target={"_blank"}
          >
            {" "}
            <Image
              src={"/icons/youtube.png"}
              width={30}
              height={30}
              alt="Instagram"
              className="hover:scale-110 transition-all duration-300"
            />
          </a>
          <a href="https://www.facebook.com/Croonus/" target={"_blank"}>
            <Image
              src={"/icons/facebook.png"}
              width={30}
              height={30}
              alt="Instagram"
              className="hover:scale-110 transition-all duration-300"
            />
          </a>
        </div>
      </div>
      <div className="mx-[5rem] max-md:w-[95%] max-md:mx-auto py-[2.75rem] mt-[1.75rem] max-xl:flex-col flex items-center justify-between border-l-0 border-t-0 border-r-0 border-b-2 border-b-white text-[#191919]">
        <div className="flex items-center max-md:hidden max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-5 max-md:w-full md:gap-[100px] 2xl:gap-[150px] 3xl:gap-[220px]">
          <div className="flex flex-col self-start gap-[40px] max-md:self-center">
            <p className="text-[1.063rem] font-bold">Korisnička podrška</p>
            <div className="flex flex-col items-start gap-[0.4rem] text-[0.813rem] font-normal">
              <Link
                className={`cursor-pointer hover:text-[#04b400] ${pathname === "/strana/kako-kupiti" && "text-[#04b400]"
                  }`}
                href={"/strana/kako-kupiti"}
              >
                Kako kupiti
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#04b400] ${pathname === "/strana/reklamacije" && "text-[#04b400]"
                  }`}
                href="/strana/reklamacije"
              >
                Reklamacije
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#04b400] ${pathname === "/povracaj-sredstava" && "text-[#04b400]"
                  }`}
                href="/povracaj-sredstava"
              >
                Povraćaj sredstava
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#04b400] ${pathname === "/zamena-za-isti-artikal" && "text-[#04b400]"
                  }`}
                href="/zamena-za-isti-artikal"
              >
                Zamena za isti artikal
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#04b400] ${pathname === "/zamena-za-drugi-artikal" && "text-[#04b400]"
                  }`}
                href="/zamena-za-drugi-artikal"
              >
                Zamena za drugi artikal
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#04b400] ${pathname === "/strana/pravo-na-odustajanje" &&
                  "text-[#04b400]"
                  }`}
                href="/strana/pravo-na-odustajanje"
              >
                Pravo na odustajanje
              </Link>
            </div>
          </div>
          <div className="flex flex-col self-start gap-[40px] max-md:self-center">
            <p className="text-[1.063rem] font-bold">O nama</p>
            <div className="flex flex-col items-start gap-[0.4rem] text-[0.813rem] font-normal">
              <Link
                href={`/stranica-u-izradi`}
                className={`cursor-pointer hover:text-[#04b400] ${pathname === "/stranica-u-izradi" && "text-[#04b400]"
                  }`}
              >
                Više o kompaniji Croonus
              </Link>

              <Link
                href={`/stranica-u-izradi`}
                className={`cursor-pointer hover:text-[#04b400] ${pathname === "/stranica-u-izradi" && "text-[#04b400]"
                  }`}
              >
                Ponude za posao
              </Link>

              <Link
                href={`/maloprodaje`}
                className={`cursor-pointer hover:text-[#04b400] ${pathname === "/maloprodaje" && "text-[#04b400]"
                  }`}
              >
                Naše prodavnice
              </Link>
            </div>
          </div>
          <div className="flex max-[493px]:mt-10 flex-col self-start gap-[40px] max-md:self-center">
            <p className="text-[1.063rem] font-bold">Možda te interesuje</p>
            <div className="flex flex-col items-start gap-[0.4rem] text-[0.813rem] font-normal">
              <Link
                href={`/zene/odeca/topovi`}
                className={`cursor-pointer hover:text-[#04b400] ${pathname === "/zene/odeca/topovi" && "text-[#04b400]"
                  }`}
              >
                Topovi
              </Link>
              <Link
                href={`/zene/odeca/haljine`}
                className={`cursor-pointer hover:text-[#04b400] ${pathname === "/zene/odeca/haljine" && "text-[#04b400]"
                  }`}
              >
                Haljine
              </Link>
              <Link
                href={`/zene/obuca`}
                className={`cursor-pointer hover:text-[#04b400] ${pathname === "/zene/obuca" && "text-[#04b400]"
                  }`}
              >
                Obuća
              </Link>

              {/*<span className={`cursor-pointer hover:text-[#04b400]`}>*/}
              {/*  Outlet*/}
              {/*</span>*/}
            </div>
          </div>
        </div>
        <div className="flex md:hidden items-center max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-5 max-md:w-full md:gap-[100px] 2xl:gap-[150px] 3xl:gap-[220px]">
          <div
            onClick={() => setOpen({ id: open?.id === 1 ? null : 1 })}
            className="flex flex-col self-start gap-[40px] max-md:self-center"
          >
            <p className="text-[1.063rem] font-bold">Korisnička podrška</p>
            {open?.id === 1 && (
              <div className="flex flex-col items-center justify-center gap-[0.4rem] text-[0.813rem] font-normal">
                <Link
                  className={`cursor-pointer hover:text-[#04b400] ${pathname === "/strana/kako-kupiti" && "text-[#04b400]"
                    }`}
                  href="/strana/kako-kupiti"
                >
                  Kako kupiti
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#04b400] ${pathname === "/strana/reklamacije" && "text-[#04b400]"
                    }`}
                  href="/strana/reklamacije"
                >
                  Reklamacije
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#04b400] ${pathname === "/povracaj-sredstava" && "text-[#04b400]"
                    }`}
                  href="/povracaj-sredstava"
                >
                  Povraćaj sredstava
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#04b400] ${pathname === "/zamena-za-isti-artikal" && "text-[#04b400]"
                    }`}
                  href="/zamena-za-isti-artikal"
                >
                  Zamena za isti artikal
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#04b400] ${pathname === "/zamena-za-drugi-artikal" && "text-[#04b400]"
                    }`}
                  href="/zamena-za-drugi-artikal"
                >
                  Zamena za drugi artikal
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#04b400] ${pathname === "/strana/pravo-na-odustajanje" &&
                    "text-[#04b400]"
                    }`}
                  href="/strana/pravo-na-odustajanje"
                >
                  Pravo na odustajanje
                </Link>
              </div>
            )}
          </div>
          <div
            onClick={() => setOpen({ id: open?.id === 2 ? null : 2 })}
            className="flex flex-col self-start gap-[40px] max-md:self-center text-center"
          >
            <p className="text-[1.063rem] font-bold">O nama</p>
            {open?.id === 2 && (
              <div className="flex flex-col items-center justify-center gap-[0.4rem] text-[0.813rem] font-normal">


                <Link
                  href={`/stranica-u-izradi`}
                  className={`cursor-pointer hover:text-[#04b400] ${pathname === "/stranica-u-izradi" && "text-[#04b400]"
                    }`}
                >
                  Ponude za posao
                </Link>

                <Link
                  href={`/maloprodaje`}
                  className={`cursor-pointer hover:text-[#04b400] ${pathname === "/maloprodaje" && "text-[#04b400]"
                    }`}
                >
                  Naše prodavnice
                </Link>
              </div>
            )}
          </div>
          <div
            onClick={() => setOpen({ id: open?.id === 3 ? null : 3 })}
            className="flex flex-col self-start gap-[40px] max-md:self-center"
          >
            <p className="text-[1.063rem] font-bold">Možda te interesuje</p>
            {open?.id === 3 && (
              <div className="flex flex-col items-center justify-center gap-[0.4rem] text-[0.813rem] font-normal">
                <Link
                  href={`/zene/odeca/topovi`}
                  className={`cursor-pointer hover:text-[#04b400] ${pathname === "/zene/odeca/topovi" && "text-[#04b400]"
                    }`}
                >
                  Topovi
                </Link>
                <Link
                  href={`/zene/odeca/haljine`}
                  className={`cursor-pointer hover:text-[#04b400] ${pathname === "/zene/odeca/haljine" && "text-[#04b400]"
                    }`}
                >
                  Haljine
                </Link>
                <Link
                  href={`/zene/obuca`}
                  className={`cursor-pointer hover:text-[#04b400] ${pathname === "/zene/obuca" && "text-[#04b400]"
                    }`}
                >
                  Obuća
                </Link>

                {/*<span className={`cursor-pointer hover:text-[#04b400]`}>*/}
                {/*  Outlet*/}
                {/*</span>*/}
              </div>
            )}
          </div>
        </div>

        <div className="flex max-xl:mt-5 flex-col max-md:mt-10 self-start gap-[1.25rem] max-xl:w-full xl:max-w-[450px] 2xl:max-w-[450px] 3xl:max-w-[578px]">
          <div className="flex items-center gap-1 ">
            <div>
              <Image
                src={"/icons/bank/idcheck.webp"}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down w-12 h-auto"
              />
            </div>
            <div>
              <Image
                src={"/icons/bank/visaSecure.webp"}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down w-12 h-auto"
              />
            </div>
            <div>
              <Image
                src={"/icons/bank/bancaIntesa.webp"}
                width={200}
                height={70}
                alt="Master Card"
                className="object-scale-down w-12 h-auto"
              />
            </div>
            <div>
              <Image
                src={"/icons/bank/mastercard.webp"}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down w-12 h-auto"
              />
            </div>
            <div>
              <Image
                src={"/icons/bank/maestro.webp"}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down w-12 h-auto"
              />
            </div>
            <div>
              <Image
                src={"/icons/bank/dinacard.webp"}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down w-12 h-auto"
              />
            </div>
            <div>
              <Image
                src={"/icons/bank/visa.webp"}
                width={50}
                height={30}
                alt="Visa"
                className="object-scale-down w-12 h-auto"
              />
            </div>
            <div>
              <Image
                src={"/icons/bank/american.webp"}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down w-12 h-auto"
              />
            </div>
          </div>
          <p className="text-[0.813rem] font-normal text-[#191919] ">
            Cene na sajtu su iskazane u dinarima sa uračunatim porezom, a
            plaćanje se vrši isključivo u dinarima. Isporuka se vrši SAMO na
            teritoriji Republike Srbije.
          </p>
          <p className="text-[0.813rem] font-normal text-[#191919] ">
            Nastojimo da budemo što precizniji u opisu proizvoda, prikazu slika
            i samih cena, ali ne možemo garantovati da su sve informacije
            kompletne i bez grešaka. Svi artikli prikazani na sajtu su deo naše
            ponude i ne podrazumeva da su dostupni u svakom trenutku.
          </p>
        </div>
      </div>
      <div className="mx-[5rem] max-md:flex-col max-md:gap-10 max-md:w-[95%] max-md:mx-auto py-[1.25rem] flex items-center justify-between">
        <div className="flex max-md:flex-wrap items-center gap-2">
          <Link
            href="/strana/uslovi-koriscenja"
            className={`text-[0.813rem] font-normal text-[#191919] hover:text-[#04b400] cursor-pointer ${pathname === "/strana/uslovi-koriscenja" && "text-[#04b400]"
              }`}
          >
            Uslovi korišćenja •
          </Link>
          <Link
            href="/strana/zastita-privatnosti"
            className={`text-[0.813rem] font-normal text-[#191919] hover:text-[#04b400] cursor-pointer ${pathname === "/strana/zastita-privatnosti" && "text-[#04b400]"
              }`}
          >
            Zaštita privatnosti •
          </Link>
          <Link
            href="/strana/isporuka"
            className={`text-[0.813rem] font-normal text-[#191919] hover:text-[#04b400] cursor-pointer ${pathname === "/strana/isporuka" && "text-[#04b400]"
              }`}
          >
            Isporuka •
          </Link>
          <Link
            href="/strana/najcesca-pitanja"
            className={`text-[0.813rem] font-normal text-[#191919] hover:text-[#04b400] cursor-pointer ${pathname === "/najcesca-pitanja" && "text-[#04b400]"
              }`}
          >
            Najčešća pitanja •
          </Link>
          <Link
            href="/strana/kolacici"
            className={`text-[0.813rem] font-normal text-[#191919] hover:text-[#04b400] cursor-pointer ${pathname === "/strana/kolacici" && "text-[#04b400]"
              }`}
          >
            Politika o 'Kolačićima'
          </Link>
        </div>
        <p className="text-[0.813rem] font-normal text-[#191919] ">
          &copy; {new Date().getFullYear()} Croonus.com | Sva prava zadržana.
          Powered by{" "}
          <a
            href="https://www.croonus.com"
            target={"_blank"}
            className="hover:text-[#04b400] cursor-pointer bganimatethumb relative"
          >
            Croonus Technologies
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
