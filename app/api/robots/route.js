/*
 * API ruta za generisanje robots.txt fajla
 *
 * Dinamički generiše robots.txt fajl, prilagođavajući se trenutnom
 * protokolu i hostu na kojem se aplikacija pokreće (lokalno, staging, produkcija).
 * Robots.txt služi pretraživačima (Google, Bing itd.) kao vodič za indeksiranje sadržaja,
 * ukazujući im na lokaciju glavnog sitemap fajla.
 */

/**
 * GET handler za robots.txt
 *
 * @param {Request} req - HTTP zahtev koji sadrži informacije o trenutnom hostu i protokolu.
 * @returns {Promise<Response>} - Tekstualni odgovor koji sadrži robots.txt sadržaj.
 */

export async function GET(req) {
  const { headers } = req;
  const protocol = headers.get("x-forwarded-proto") || "http";
  const host = headers.get("host") || "localhost:3000";

  // TODO: Povezati api za dobijanje robots sadrzaja

  // Sadržaj robots.txt fajla
  const robotsContent = `
User-agent: *
Disallow:
  
Sitemap: ${protocol}://${host}/api/sitemap?slug=sitemap/index.xml`;

  // Vraća robots.txt sadržaj u tekstualnom formatu
  return new Response(robotsContent.trim(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
