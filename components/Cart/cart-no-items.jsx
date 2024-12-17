import Link from "next/link";

export const CartNoItems = () => {
  return (
    <>
      <div className="nocontent-holder mt-[1.2rem] lg:mt-[13rem] flex items-center justify-center max-md:w-[95%] mx-auto">
        <div className="text-center justify-center items-center flex flex-col border border-[#f8f8f8] rounded-3xl p-10">
          <div className="text-center">
            <span className="text-2xl font-medium">Vaša korpa</span>
          </div>
          <div className="mt-6 text-center text-lg font-medium">
            Trenutno ne postoji sadržaj u Vašoj korpi.
          </div>
          <div className="mt-5 text-center">
            <Link href="/">
              <button className="bg-[#2bc48a] mt-10 px-10 font-medium text-white hover:bg-opacity-80 py-4">
                Vrati se na početnu stranu
              </button>
            </Link>
          </div>
          <div className="help-container mt-10 text-center">
            <p className="font-medium">Pomoć pri kupovini:</p>
            <ul className="mt-2">
              <li>
                - Ukoliko Vam je potrebna pomoć u svakom trenutku nas možete
                kontaktirati pozivom na broj call centra{" "}
                <a href={`tel:${process.env.TELEPHONE}`}>
                  ${process.env.TELEPHONE}
                </a>
                .
              </li>
              <li>- Pogledajte uputstvo za pomoć pri kupovini.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
