# SEO Sitemap modul

## Pregled

SEO Sitemap modul je dizajniran za dinamičko generisanje, ažuriranje i serviranje sitemap fajlova. Ovaj modul omogućava pružanje ažuriranih sitemap fajlova za web crawlers. Koristi `/tmp` direktorijum za privremeno skladištenje sitemap fajlova i pruža API endpoint-e za njihovo generisanje i serviranje.

---

## Ključne funkcionalnosti

1. **Generisanje sitemap-a:**

   - Modul dinamički generiše sitemap fajlove koristeći listu prosleđenih putanja.
   - Za svaku putanju, koristi fetch za preuzimanje Base64 kodiranog sadržaja fajla, dekodira ga u XML format, a zatim generiše odgovarajući sitemap fajl.

2. **Ažuriranje sitemap-a:**

   - Automatsko ažuriranje se inicira putem `/api/sitemap/update` endpoint-a, koji prima listu novih fajlova za obradu.
   - Nakon prijema liste, prethodno generisani fajlovi se brišu, a zatim se ponavlja proces generisanja novih sitemap fajlova koristeći prosleđene putanje.
   - Endpoint validira IP adresu klijenta pre pokretanja generisanja kako bi osigurao sigurnost zahteva.

3. **Serviranje sitemap-a:**

   - Web crawler-i pristupaju sitemap fajlovima putem `/api/sitemap` endpoint-a.
   - Ako traženi fajl postoji u `/tmp` direktorijumu, servira se kao XML sadržaj.
   - Ako trazeni fajl ne postoji, proverava se da li direktorijum `sitemap` već postoji u `/tmp`:
      - Ako postoji, sitemap fajlovi su vec generisani, ali je slug neispravan. Endpoint vraca status `404`.
      - Ako `sitemap` direktorijum ne postoji, generise se sitemap i ponovo se proverava slug

4. **Upravljanje privremenim fajlovima:**
   - Pre generisanja novih sitemap fajlova, stari fajlovi iz direktorijuma `/tmp` se brišu kako bi se izbeglo preklapanje ili nepotrebni podaci.
   - Fajlovi se čuvaju u odgovarajućoj hijerarhijskoj strukturi u /tmp direktorijumu, spremni za brzo serviranje.

---

## API endpoint-i

### 1. `/api/sitemap`

Servira sitemap fajlove na osnovu parametra `slug`.

- **Metod:** `GET`
- **Parametar:**
  - `slug` _(query)_: Relativna putanja do sitemap fajla.
- **Primer zahteva:**
  ```http
  GET /api/sitemap?slug=sitemap/categories.xml
  ```
- **Opis:**
  - Ako fajl postoji u `/tmp`, čita ga i vraća kao XML sadržaj.
  - Ako fajl ne postoji, proverava da li je sitemap generisan:
    - Ako je generisan, vraca status `404` jer je slug neispravan
    - Ako nije generisan, generise ga i ponovo proverava slug

---

### 2. `/api/sitemap/update`

Ažurira sve sitemap fajlove na osnovu prosleđenih podataka.

- **Metod:** `POST`
- **Primer tela zahteva:**
  ```json
  {
    "files": [
      { "path": "sitemap/categories.xml" },
      { "path": "sitemap/products.xml" }
    ]
  }
  ```
- **Sigurnosna provera:**
  - Proverava IP adresu klijenta (`x-forwarded-for`) u odnosu na `SERVER_IP` definisanu u `.env`.
- **Opis:**
  - Koristi funkciju `buildSitemapFile` za generisanje novih sitemap fajlova.
  - Vraća status `200` ako je ažuriranje uspešno.

---

## Glavne funkcije

### `buildSitemapFile(fileList)`

Generiše nove sitemap fajlove na osnovu zadate liste fajlova.

- **Parametar:**
  - `fileList` _(Array)_: Lista objekata sa putanjama fajlova.
- **Koraci:**
  1. Briše stare sitemap fajlove iz direktorijuma `/tmp/sitemap`.
  2. Preuzima sadržaj fajlova koristeći API i dekodira ga iz Base64 formata.
  3. Zapisuje sadržaj u odgovarajuće XML fajlove u `/tmp`.

---

## Korišćene environment varijable

- **`SERVER_IP`**: IP adresa ovlašćenih klijenata za pristup `/api/sitemap/update`.
