# Joblio

Joblio este interfata web pentru cautarea de joburi din Romania. Aplicatia ofera o experienta rapida si curata pentru explorarea anunturilor, filtrare dupa criterii relevante si deschiderea paginilor individuale de job.

## Ce face proiectul

- afiseaza joburile publicate prin API-ul backend
- permite cautare dupa cuvinte cheie, companie si judet
- afiseaza salariul atunci cand exista date disponibile
- afiseaza modul de lucru pentru joburile care au `remote`, `hybrid` sau `on-site`
- include pagini SEO-friendly pentru homepage, cautare si detaliu job

## Stack

- React
- Vite
- Tailwind CSS
- React Router
- Netlify pentru deploy frontend

## Structura

```text
Joblio/
├── README.md
└── UI/
    ├── src/
    ├── public/
    ├── package.json
    ├── vite.config.ts
    └── netlify.toml
```

## Rulare locala

Din `Joblio/UI`:

```bash
npm install
npm run dev
```

Aplicatia porneste in mod normal pe `http://127.0.0.1:5173`.

In dezvoltare, request-urile catre `/mobile` sunt proxied catre backend-ul local Django.

## Build pentru productie

Din `Joblio/UI`:

```bash
npm run build
```

Output-ul final este generat in `Joblio/UI/dist`.

Build-ul include automat:

- `_redirects` pentru routing SPA pe Netlify
- `robots.txt`
- `sitemap.xml`

## Variabile utile pentru productie

```env
VITE_SITE_URL=https://joblio.ro
VITE_API_URL=https://api.laurentiumarian.ro
```

## Deploy

Pentru Netlify:

- Base directory: `UI`
- Publish directory: `dist`

Frontend-ul consuma date din backend-ul Django prin endpoint-urile mobile, de exemplu:

- `/mobile/`
- `/mobile/total/`

## Observatii

- salariile sunt tratate prin `salary_min`, `salary_max` si `salary_currency`
- daca un job nu are salariu, interfata afiseaza `Salariu nespecificat`
- pentru homepage, blocul `Salariu de la` foloseste o valoare robusta din backend, nu minimul absolut
