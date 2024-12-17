import fs from "fs";
import path from "path";

import { buildSitemapFile } from "@/app/api/sitemap/buildSitemapFile";
import { list } from "@/api/api";

/**
 * Kreira HTTP odgovor sa zadatim statusom, porukom i opcionalnim zaglavljima.
 *
 * @param {string} message - Poruka odgovora.
 * @param {number} status - HTTP status kod.
 * @param {Object} [headers] - Dodatni HTTP zaglavlja (opciono).
 * @returns {Response} - HTTP odgovor.
 */
function createResponse(
  message,
  status,
  headers = { "Content-Type": "application/json" }
) {
  const body =
    headers["Content-Type"] === "application/json"
      ? JSON.stringify({ message })
      : message;
  return new Response(body, { status, headers });
}

/**
 * Čita sadržaj sitemap fajla sa zadate putanje i
 * kreira HTTP odgovor sa XML sadržajem i odgovarajućim zaglavljima.
 *
 * @param {*} filePath - Putanja do sitemap fajla.
 * @returns {Response} - HTTP odgovor sa sitemap sadržajem u XML formatu.
 */
const readSitemapAndCreateResponse = (filePath) => {
  const sitemap = fs.readFileSync(filePath, "utf-8");
  return createResponse(sitemap, 200, {
    "Content-Type": "application/xml",
    "Cache-Control": "s-maxage=86400, stale-while-revalidate",
  });
};

/**
 * API ruta za dinamičko serviranje sitemap fajlova na osnovu query parametra `slug`.
 * Omogućava crawler-ima pristup sitemap fajlovima u /tmp direktorijumu.
 *
 * @param {Request} req - HTTP zahtev sa query parametrom `slug`.
 * @param {Headers} req.headers - HTTP zaglavlja koja sadrže informacije o protokolu i hostu.
 * @returns {Promise<Response>} - XML sadržaj sitemap fajla ili JSON poruka o grešci.
 * 
 * @throws {Error} Ako nema dostupnih sitemap fajlova ili dođe do greške u procesu.

 */

export async function GET(req) {
  // Parsiranje query parametra `slug` iz URL-a
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return createResponse("Missing `slug` parameter.", 400);
  }

  try {
    // Formiranje putanje do traženog fajla u `/tmp` direktorijumu
    const filePath = path.join("/tmp", slug);

    // Ako fajl postoji u `/tmp`
    if (fs.existsSync(filePath)) {
      return readSitemapAndCreateResponse(filePath);
    } else {
      /**
       * filePath u `/tmp` direktorijumu ne postoji ali postoji sitemap direktorijum.
       * To znaci da je sitemap generisan ali je trazeni slug pogresan. Zato treba izbaciti gresku i prekinuti dalje izvrsavanje koda
       */
      if (fs.readdirSync("/tmp").length > 0) {
        console.warn(`Requested sitemap not found: ${slug}`);
        return createResponse("Sitemap not found.", 404);
      }

      /**
       * Ukoliko je izvrsavanje koda doslo do ovde, znaci da sitemap jos nije generisan
       *
       * Zasto sitemap nije generisan pri build-u?
       * Vercel funksionise tako da tokom build-a moze kreirati /tmp direktorijum ali
       * se ne prenosi u runtime okruzenje.
       * Zato, cim web crawler ili bilo ko drugi pristupi ovom API endpoint-u,
       * ukoliko ne postoji tmp direktorijum, bice kreiran.
       */

      // Dohvatanje liste fajlova za sitemap
      const filesResponse = await list(`/sitemap/files`);
      const files = filesResponse?.payload?.files;
      if (!files || files.length === 0) {
        console.error("No sitemap files found.");
        throw new Error("No sitemap files found");
      }

      if (files) {
        await buildSitemapFile(files);
        return readSitemapAndCreateResponse(filePath);
      }
    }
  } catch (error) {
    console.error("Error serving sitemap:", error.message);
    return createResponse("Internal server error.", 500);
  }
}
