import Image from "next/image";
import Link from "next/link";


const PageInConstruction = () => {
  return (
    <>
      {/* Glavni kontejner */}
      <div style={{ position: "relative", textAlign: "center", maxWidth: "1200px", margin: "auto" }}>
        {/* Naslov i uvodni tekst */}
        <div style={{ margin: "20px 0" }}>
          <h2 style={{ fontSize: "2rem", color: "#000", marginBottom: "10px" }}>O NAMA</h2>
          <p style={{ fontSize: "1rem", color: "#555", lineHeight: "1.5" }}>
            Moda je važan deo našeg života. <br />
            Pokazuje što smo i istovremeno nam omogućava da igramo različite uloge.
          </p>
        </div>

        {/* Sekcija slike */}
        <div style={{ position: "relative", width: "144%", marginTop: "50px", marginLeft: "-265px" }}>
          <Image
            src={`/icons/slika999.png`}// Promeni putanju ukoliko je slika drugačije smeštena
            alt="Fashion Image"
            layout="responsive"
            width={1800}
            height={600}
          />

          {/* Tekst ispod slike koji prekriva donji deo */}
          <div
            style={{
              position: "absolute",
              bottom: "-230px", // Pomera tekst niže
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "white",
              padding: "20px",
              width: "65%",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#333", fontSize: "1rem" }}>
              Since its creation in 1971, REISS has established a design philosophy centred on creating <br />
              modern menswear, womenswear, accessories, and childrenswear <br /> that transcends time and trends.
            </p>

            <p style={{ color: "#555", marginTop: "10px", fontSize: "0.9rem" }}>
              With a London in-house atelier and a design team dedicated to delivering pieces <br /> that continuously embody its legacy, REISS today operates as a modern <br /> fashion house, offering attainable-luxury collections of unwavering elegance.
            </p>

            <p style={{ color: "#333", marginTop: "10px", fontSize: "1rem", lineHeight: "1.5" }}>
              Throughout five decades, REISS has established a unique style vocabulary - and conquered a <br /> loyal following of discerning individuals, stylish celebrities, and Royalty.
            </p>

            <p style={{ color: "#555", marginTop: "10px", fontSize: "0.9rem" }}>
              This Is Our Story’ tells the story and highlights of the brand from 1971 to the present day.
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

      </div>
    </>
  );
};

export default PageInConstruction;

export const metadata = {
  title: "O Nama | Fashion Template",
  description: "Stranica o nama sa modernim dizajnom.",
};
