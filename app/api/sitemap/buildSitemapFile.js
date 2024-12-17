const { fetch } = require("../../../api/api");
const fs = require("fs");
const path = require("path");

/**
 * Odgovor za API
 *
 * @param {string} message - Poruka odgovora.
 * @param {number} status - HTTP status kod.
 * @returns {Response} - HTTP odgovor.
 */
function createResponse(message, status) {
  return new Response(JSON.stringify({ message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Kreira sitemap fajlove sa odgovarajućom strukturom direktorijuma
 * Fajlovi se generisu u `/tmp` direktorijumu
 *
 * @param {Array} sitemapData - Podaci o sitemap fajlovima (putanja i sadržaj)
 */

const createSitemapFiles = (sitemapData) => {
  sitemapData.forEach(({ path: filePath, content }) => {
    // Formiranje putanje do fajla u `/tmp` direktorijumu
    const outputPath = path.join("/tmp", filePath);

    // Kreiranje potrebnih direktorijuma ukoliko ne postoje
    const outputDir = path.dirname(outputPath);
    fs.mkdirSync(outputDir, { recursive: true });

    // Zapisivanje XML sadržaja u fajl
    fs.writeFileSync(outputPath, content, "utf-8");
    console.log(`Sitemap file created: ${filePath}`);
  });
};

/**
 * Proverava da li postoji direktorijum `/tmp` i briše sav sadržaj unutar njega
 * kako bi se osiguralo da novi sitemap fajlovi ne preklapaju postojeće.
 */
const deleteOldSitemaps = () => {
  const sitemapDir = "/tmp";
  if (fs.existsSync(sitemapDir)) {
    // Brisanje svih fajlova i poddirektorijuma unutar sitemap direktorijuma
    fs.readdirSync(sitemapDir).forEach((file) => {
      const filePath = path.join(sitemapDir, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
    });
    console.log("Old sitemap files deleted.");
  } else {
    console.log("No sitemap directory found to delete.");
  }
};

/**
 * Dekodira Base64 string u XML sadržaj.
 *
 * @param {string} base64Content - Base64 kodirani string.
 * @returns {string} - Dekodirani XML string.
 */
const decodeBase64ToXml = (base64Content) => {
  const base64Data = base64Content.split(",")[1];
  return Buffer.from(base64Data, "base64").toString("utf-8");
};

/**
 * buildSitemapFile - Glavna funkcija za generisanje sitemap fajlova
 *
 * Ova funkcija:
 * 1. Briše stare sitemap fajlove.
 * 2. Iterira kroz svaki fajl i preuzima njegov sadržaj.
 * 3. Generiše nove fajlove u `/tmp` direktorijumu.
 *
 * @async
 * @param {Array<{path: string}>} fileList - Lista fajlova za generisanje sitemap-a.
 * @returns {Promise<Response>} - HTTP odgovor koji ukazuje na uspešnost generisanja sitemap-a.
 *
 * @throws {Error} Ako dođe do greške tokom generisanja sitemap fajlova.
 */
const buildSitemapFile = async (fileList) => {
  try {
    // Brise vec kreirane fajlove ako postoje
    deleteOldSitemaps();

    const sitemapData = [];

    // Iteracija kroz fajlove i dohvatanje njihovog sadržaja
    for (const file of fileList) {
      console.log(`Generated file: ${file.path}`);

      try {
        const fetchResponse = await fetch(`/sitemap`, { path: file.path });
        const base64Content = fetchResponse?.payload?.file_base64;

        if (!base64Content) {
          console.warn(`No content found for file: ${file.path}`);
          continue;
        }

        const xmlContent = decodeBase64ToXml(base64Content);

        sitemapData.push({ path: file.path, content: xmlContent });
      } catch (fetchError) {
        console.error(
          `Error fetching content for file: ${file.path}`,
          fetchError
        );
        continue;
      }
    }

    // Provera da li ima prikupljenih podataka za zapisivanje
    if (sitemapData.length === 0) {
      throw new Error("No valid sitemap data fetched");
    }

    // Kreiranje sitemap fajlova sa odgovarajućom strukturom direktorijuma
    createSitemapFiles(sitemapData);

    console.log("Sitemap generation completed successfully.");
    return createResponse("Sitemap successfully updated.", 200);
  } catch (error) {
    console.error("Error during sitemap generation:", error.message);
    throw error;
  }
};

module.exports = { buildSitemapFile };
